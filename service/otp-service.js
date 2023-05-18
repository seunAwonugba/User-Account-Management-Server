const { OtpRepository } = require("../repository/otp-repository");
const { GenerateOtpSecreteKey } = require("../utils");

class OtpService {
    constructor() {
        this.otpRepository = new OtpRepository();
    }

    async updateOtp(userId) {
        const otpData = GenerateOtpSecreteKey();
        const otp = await this.otpRepository.updateOtp(otpData, userId);
    }
}
