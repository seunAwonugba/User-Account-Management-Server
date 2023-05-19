const { BadRequest } = require("../error");
const { OtpRepository } = require("../repository/otp-repository");
const { UserRepository } = require("../repository/user-repository");
const { GenerateOtpSecreteKey, VerifyOtp } = require("../utils");

class OtpService {
    constructor() {
        this.otpRepository = new OtpRepository();
        this.userRepository = new UserRepository();
    }

    async updateOtp(userId) {
        const otpData = GenerateOtpSecreteKey();
        const otp = await this.otpRepository.updateOtp(otpData, userId);

        return {
            success: true,
            data: otp,
        };
    }

    async verifyOtp(userId, otp) {
        const user = await this.userRepository.findUserById(userId);

        if (!user) {
            throw new BadRequest("User not found");
        }

        const getOtp = await user.getOtp();

        const otpBase32 = getOtp.otpBase32;

        if (!otpBase32) {
            throw new BadRequest("Please enable mfa to proceed");
        }

        const verified = VerifyOtp(otp, otpBase32);
        console.log(verified);

        if (!verified) {
            throw new BadRequest("Invalid OTP");
        }

        const updateUser = user.set({
            otpEnabled: true,
            otpVerified: true,
        });

        return {
            success: true,
            data: updateUser,
        };
    }
}

module.exports = { OtpService };
