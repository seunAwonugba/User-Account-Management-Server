const { StatusCodes } = require("http-status-codes");
const { UserService } = require("../service/user-service");
const { VerifyRefreshToken } = require("../utils");
const { OtpService } = require("../service/otp-service");

const userService = new UserService();
const otpService = new OtpService();

const signUp = async (req, res, next) => {
    try {
        const user = await userService.signUp(req.body);
        return res.status(StatusCodes.CREATED).json(user);
    } catch (error) {
        next(error);
    }
};

const confirmEmail = async (req, res, next) => {
    try {
        const user = await userService.confirmEmail(req.query);
        res.status(StatusCodes.OK).json(user);
    } catch (error) {
        next(error);
    }
};

const sendPasswordResetLink = async (req, res, next) => {
    try {
        const user = await userService.sendPasswordResetLink(req.body);
        return res.status(StatusCodes.CREATED).json(user);
    } catch (error) {
        next(error);
    }
};

const resetPassword = async (req, res, next) => {
    try {
        const data = await userService.resetPassword(
            { ...req.query },
            { ...req.body }
        );

        return res.status(StatusCodes.CREATED).json(data);
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const data = await userService.login(req.body);
        return res.status(StatusCodes.OK).json(data);
    } catch (error) {
        next(error);
    }
};

const refreshToken = async (req, res, next) => {
    try {
        const data = await userService.refreshToken(req.body);
        return res.status(StatusCodes.CREATED).json(data);
    } catch (error) {
        next(error);
    }
};

const implementOtp = async (req, res, next) => {
    try {
        const otp = await otpService.updateOtp(req.user.id);
        return res.status(StatusCodes.CREATED).json(otp);
    } catch (error) {
        next(error);
    }
};

const verifyOtp = async (req, res, next) => {
    const { otp } = req.body;
    try {
        const verifyOtp = await otpService.verifyOtp(req.user.id, otp);
        return res.status(StatusCodes.CREATED).json(verifyOtp);
    } catch (error) {
        next(error);
    }
};

const validateOtp = async (req, res, next) => {
    const { otp } = req.body;
    try {
        const validateOtp = await otpService.validateOtp(req.user.id, otp);
        return res.status(StatusCodes.CREATED).json(validateOtp);
    } catch (error) {
        next(error);
    }
};

const disableOtp = async (req, res, next) => {
    try {
        const disableOtp = await otpService.disableOtp(req.user.id);
        return res.status(StatusCodes.OK).json(disableOtp);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    signUp,
    confirmEmail,
    sendPasswordResetLink,
    resetPassword,
    login,
    refreshToken,
    implementOtp,
    verifyOtp,
    validateOtp,
    disableOtp,
};
