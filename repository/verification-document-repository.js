const { verificationDocument } = require("../models");

class VerificationDocumentRepository {
    async createVerificationDocuments(userId) {
        const createVerificationDocuments = await verificationDocument.create({
            userId,
        });

        return createVerificationDocuments;
    }

    async updateVerificationDocument(file, body, userId) {
        const { fieldname, originalname, mimetype, filename, path, size } =
            file;

        const newVerificationDocs = await verificationDocument.update(
            {
                fieldName: fieldname,
                originalName: originalname,
                mimeType: mimetype,
                fileName: filename,
                path,
                size,
                docs: `http://${process.env.HOST}:${process.env.PORT}/${filename}`,
                documentType: body.documentType,
                documentNumber: body.documentNumber,
            },
            {
                where: {
                    userId,
                },
                returning: true,
            }
        );

        const [_numAffectedRows, [updatedData]] = newVerificationDocs;

        return updatedData;
    }
}

module.exports = { VerificationDocumentRepository };
