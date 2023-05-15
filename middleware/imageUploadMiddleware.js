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
        cb(null, __basedir + "uploads");
        // cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.filename + "-" + uniqueSuffix);
    },
});

const imageUploadMiddleware = multer({
    storage: storage,
    fileFilter: imageFilter,
});

module.exports = { imageUploadMiddleware };
