const multer = require("multer");

const docsFilter = (req, file, cb) => {
    if (
        file.mimetype.startsWith("image") ||
        file.mimetype.split("/")[1] === "pdf"
    ) {
        cb(null, true);
    } else {
        cb("Please upload only images or pdf", false);
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/docs/");
    },
    filename: (req, file, cb) => {
        // console.log(file);
        const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, `${uniquePrefix}-${file.originalname}`);
    },
});

const docsUploadMiddleware = multer({
    storage: storage,
    fileFilter: docsFilter,
});

module.exports = { docsUploadMiddleware };
