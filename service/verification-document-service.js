const { UnprocessableEntity } = require("../error");
const { UserRepository } = require("../repository/user-repository");
const {
    VerificationDocumentRepository,
} = require("../repository/verification-document-repository");

class VerificationDocumentService {
    constructor() {
        this.verificationDocumentRepository =
            new VerificationDocumentRepository();

        this.userRepository = new UserRepository();
    }

    async updateVerificationDocs(file, body, userId) {
        if (!file) {
            throw new UnprocessableEntity("Select document to upload");
        }

        const verificationDocs =
            await this.verificationDocumentRepository.updateVerificationDocument(
                file,
                body,
                userId
            );

        await this.userRepository.updateVerificationStatus(userId);

        return {
            success: true,
            data: verificationDocs,
        };
    }
}

module.exports = { VerificationDocumentService };
