const { StatusCodes } = require("http-status-codes");
const {
    VerificationDocumentService,
} = require("../service/verification-document-service");

const verificationDocumentService = new VerificationDocumentService();

const updateVerificationDocuments = async (req, res, next) => {
    try {
        const updateVerificationDocuments =
            await verificationDocumentService.updateVerificationDocs(
                req.file,
                req.body,
                req.user.id
            );

        return res
            .status(StatusCodes.CREATED)
            .json(updateVerificationDocuments);
    } catch (error) {
        next(error);
    }
};

module.exports = { updateVerificationDocuments };
