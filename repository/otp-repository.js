const { otp } = require("../models");
// const otp = require("../models/otp")

class OtpRepository {
    async createOtp(userId) {
        const createOtp = await otp.create({ userId });

        return createOtp;
    }

    async updateOtp(payload,userId){
        const updateOtp = await otp.update({
            
        })

    }
}

module.exports = { OtpRepository };
