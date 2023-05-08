const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
require("dotenv").config();

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

module.exports.VerifyToken = (accessToken) => {
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
