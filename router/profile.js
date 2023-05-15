const express = require("express");
const {
    getProfile,
    editProfile,
    updateProfileImage,
} = require("../controller/profile");
const {
    imageUploadMiddleware,
} = require("../middleware/imageUploadMiddleware");

const profileRouter = express.Router();

profileRouter.get("/get-profile", getProfile);
profileRouter.patch("/edit-profile", editProfile);
profileRouter.put(
    "/update-profile-image",
    imageUploadMiddleware.single("profile-image"),
    updateProfileImage
);

module.exports = { profileRouter };
