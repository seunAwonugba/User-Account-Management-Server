const { UserRepository } = require("../repository/user-repository");
const validator = require("validator");
const {
    createUserSchema,
    emailSchema,
    resetPasswordSchema,
    loginSchema,
} = require("../validator/createUserSchema");
const {
    UnprocessableEntity,
    BadRequest,
    Unauthenticated,
} = require("../error");
const {
    GenerateToken,
    VerifyToken,
    ComparePasswords,
    GenerateRefreshToken,
    VerifyRefreshToken,
} = require("../utils");
const { sendConfirmEmail, sendResetPasswordLink } = require("../utils/mailer");
const { TokenRepository } = require("../repository/token-repository");
const { ProfileRepository } = require("../repository/profile-repository");
const {
    ProfileImageRepository,
} = require("../repository/profile-image-repository");
const { OtpRepository } = require("../repository/otp-repository");

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
        this.tokenRepository = new TokenRepository();
        this.profileRepository = new ProfileRepository();
        this.profileImageRepository = new ProfileImageRepository();
        this.otpRepository = new OtpRepository();
    }

    async signUp(payload) {
        const data = await createUserSchema.validateAsync(payload);

        if (!validator.default.isStrongPassword(data.password)) {
            throw new UnprocessableEntity(
                "Your password must include a minimum of 8 characters, at least one number, and a combination of uppercase and lowercase letters."
            );
        }

        const createUser = await this.userRepository.createUser(data);

        const token = await GenerateToken({
            id: createUser.id,
            email: createUser.email,
        });

        await this.tokenRepository.createToken({
            accessToken: token,
            userId: createUser.id,
        });

        const url = `${process.env.CLIENT_URL}/email-confirmation/?id=${createUser.id}&token=${token}`;

        await sendConfirmEmail(
            createUser.email,
            "Email Confirmation",
            "verify_email",
            createUser.firstName,
            url
        );

        return {
            success: true,
            data: `Confirmation email sent to ${createUser.email}, please proceed to your mail box to confirm your email address`,
            token,
        };
    }

    async confirmEmail({ id, token }) {
        const user = await this.userRepository.findUserById(id);

        if (!user) {
            throw new BadRequest("User not found");
        }

        if (user.isActive == true) {
            return {
                success: true,
                data: "Email confirmation is successful, kindly proceed to login if you are not redirected",
            };
        }

        const userToken = await this.tokenRepository.findTokenByUserId(user.id);

        if (!userToken || userToken.token !== token) {
            throw new BadRequest("Invalid token");
        }

        const verifyToken = await VerifyToken(userToken.token);

        if (verifyToken.message) {
            await this.userRepository.deleteUserById(id);
            await this.tokenRepository.deleteToken(id);

            throw new BadRequest(
                `${verifyToken.message}: Please sign up again`
            );
        }

        user.isActive = true;
        await user.save();

        await this.tokenRepository.deleteToken(id);

        await this.profileRepository.createUserProfile({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            userId: user.id,
        });

        await this.profileImageRepository.createProfileImage(user.id);

        await this.otpRepository.createOtp(user.id);

        return {
            success: true,
            data: "Email confirmation is successful, kindly proceed to login if you are not redirected",
        };
    }

    async sendPasswordResetLink(payload) {
        const data = await emailSchema.validateAsync(payload);

        const user = await this.userRepository.findUserByEmail(data.email);

        if (!user) {
            throw new BadRequest("User not found");
        }

        const token = await GenerateToken({
            id: user.id,
            email: user.email,
        });

        const url = `${process.env.CLIENT_URL}/reset-password/?id=${user.id}&token=${token}`;

        await sendResetPasswordLink(
            user.email,
            "Password Reset!!!",
            "password_reset",
            user.firstName,
            url
        );

        return {
            success: true,
            data: `Reset password link sent to ${user.email}, proceed to your mail box to reset your password`,
        };
    }

    async resetPassword(query, payload) {
        if (!validator.default.isStrongPassword(payload.password)) {
            throw new UnprocessableEntity(
                "Your password must include a minimum of 8 characters, at least one number, and a combination of uppercase and lowercase letters."
            );
        }
        await resetPasswordSchema.validateAsync(payload);

        const user = await this.userRepository.findUserById(query.id);
        if (!user) {
            throw new BadRequest("User not found");
        }

        const decode = VerifyToken(query.token);

        if (decode.message) {
            throw new Unauthenticated(
                `${decode.message}: Request another password reset`
            );
        }

        user.password = payload.password;
        await user.save();

        return {
            success: true,
            data: "Password reset successful",
        };
    }

    async login(payload) {
        const data = await loginSchema.validateAsync(payload);

        const user = await this.userRepository.findUserByEmail(data.email);

        if (!user) {
            throw new Unauthenticated("Wrong email address or password");
        }

        if (user.isActive != true) {
            throw new Unauthenticated("Confirm password to proceed with login");
        }

        const comparePassword = await ComparePasswords(
            data.password,
            user.password
        );

        if (!comparePassword) {
            throw new Unauthenticated("Wrong email address or password");
        }

        const accessToken = await GenerateToken({
            id: user.id,
            email: user.email,
        });

        const refreshToken = await GenerateRefreshToken({
            id: user.id,
            email: user.email,
        });

        return {
            success: true,
            data: user,
            accessToken,
            refreshToken,
        };
    }

    async refreshToken(payload) {
        const user = await this.userRepository.findUserByEmail(payload.email);

        if (!user) {
            throw new BadRequest("User not found");
        }

        const verifyToken = VerifyRefreshToken(
            user.email,
            payload.refreshToken
        );

        if (verifyToken.message) {
            throw new Unauthenticated(verifyToken.message);
        }

        const accessToken = await GenerateRefreshToken({
            id: user.id,
            email: user.email,
        });

        return {
            success: true,
            data: accessToken,
        };
    }
}

module.exports = { UserService };
