const { verificationDocument } = require("../models");

class VerificationDocumentRepository {
    async createVerificationDocuments(userId) {
        const createVerificationDocuments = await verificationDocument.create({
            userId,
        });

        return createVerificationDocuments;
    }
}

module.exports = { VerificationDocumentRepository };
