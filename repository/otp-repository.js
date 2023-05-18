const { otp } = require("../models");
// const otp = require("../models/otp")

class OtpRepository {
    async createOtp(userId) {
        const createOtp = await otp.create({ userId });

        return createOtp;
    }

    async updateOtp(payload, userId) {
        const updateOtp = await otp.update(
            {
                otpAscii: payload.ascii,
                otpHex: payload.hex,
                otpBase32: payload.base32,
                otpAuthUrl: payload.otpauth_url,
            },
            {
                where: {
                    userId,
                },
                returning: true,
            }
        );

        const [_numAffectedRows, [updatedData]] = updateOtp;

        return updatedData;
    }
}

module.exports = { OtpRepository };
