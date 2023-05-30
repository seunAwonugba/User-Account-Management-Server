const { UnprocessableEntity } = require("../error");
const {
    VerificationDocumentRepository,
} = require("../repository/verification-document-repository");

class VerificationDocumentService {
    constructor() {
        this.verificationDocumentRepository =
            new VerificationDocumentRepository();
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

        return {
            success: true,
            data: verificationDocs,
        };
    }
}

module.exports = { VerificationDocumentService };
