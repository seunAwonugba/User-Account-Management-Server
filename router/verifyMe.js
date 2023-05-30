const express = require("express");
const { updateVerificationDocuments } = require("../controller/verifyMe");
const { docsUploadMiddleware } = require("../middleware/docsUploadMiddleware");
const verifyMeRouter = express.Router();

verifyMeRouter.patch(
    "/verify-me",
    docsUploadMiddleware.single("verify-me-docs"),
    updateVerificationDocuments
);

module.exports = { verifyMeRouter };
