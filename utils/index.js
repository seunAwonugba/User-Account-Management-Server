require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const speakeasy = require("speakeasy");

module.exports.GenerateToken = async (params) => {
    try {
        const token = jwt.sign(params, process.env.JWT_PRIVATE_KEY, {
            expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRE_TIME,
        });
        return token;
    } catch (error) {
        return error;
    }
};

module.exports.GenerateRefreshToken = async (params) => {
    try {
        const token = jwt.sign(
            params,
            process.env.JWT_REFRESH_TOKEN_PRIVATE_KEY,
            {
                expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRE_TIME,
            }
        );
        return token;
    } catch (error) {
        return error;
    }
};

module.exports.VerifyToken = async (accessToken) => {
    try {
        const token = jwt.verify(accessToken, process.env.JWT_PRIVATE_KEY);
        return token;
    } catch (error) {
        return error;
    }
};

module.exports.VerifyRefreshToken = (email, refreshToken) => {
    try {
        const decode = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_TOKEN_PRIVATE_KEY
        );
        return decode.email == email;
    } catch (error) {
        return error;
    }
};

module.exports.ComparePasswords = async (string, hash) => {
    try {
        const comparePasswords = await bcryptjs.compare(string, hash);
        return comparePasswords;
    } catch (error) {
        return error;
    }
};

module.exports.GenerateOtpSecreteKey = () => {
    try {
        const secret = speakeasy.generateSecret({
            name: "user_account_management_app",
        });
        return secret;
    } catch (error) {
        return error;
    }
};

module.exports.VerifyOtp = (token, otpBase32) => {
    try {
        const verified = speakeasy.totp.verify({
            secret: otpBase32,
            encoding: "base32",
            token,
        });
        return verified;
    } catch (error) {
        return error;
    }
};

module.exports.ValidateOtp = (token, otpBase32) => {
    try {
        const verified = speakeasy.totp.verify({
            secret: otpBase32,
            encoding: "base32",
            token,
            window: 1,
        });
        return verified;
    } catch (error) {
        return error;
    }
};

module.exports.MapMaritalStatus = (userResponse) => {
    try {
        const responseMap = {
            unverified: "UNVERIFIED",
            pending: "PENDING VERIFICATION",
            verified: "VERIFIED",
        };
        return responseMap[userResponse.toLowerCase()] || null;
    } catch (error) {
        return error;
    }
};

module.exports.MapVerificationStatus = (userResponse) => {
    try {
        const responseMap = {
            single: "SINGLE",
            married: "MARRIED",
            divorced: "DIVORCED",
            widowed: "WIDOWED",
        };
        return responseMap[userResponse.toLowerCase()] || null;
    } catch (error) {
        return error;
    }
};
