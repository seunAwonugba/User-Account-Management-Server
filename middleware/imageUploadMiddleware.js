const multer = require("multer");

const imageFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb("Please upload only images", false);
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        // console.log(file);
        const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, `${uniquePrefix}-${file.originalname}`);
    },
});

const imageUploadMiddleware = multer({
    storage: storage,
    fileFilter: imageFilter,
});

module.exports = { imageUploadMiddleware };
