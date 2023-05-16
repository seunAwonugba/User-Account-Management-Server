const express = require("express");
const {
    getProfile,
    editProfile,
    updateProfileImage,
    getProfileImage,
} = require("../controller/profile");
const {
    imageUploadMiddleware,
} = require("../middleware/imageUploadMiddleware");

const profileRouter = express.Router();

profileRouter.get("/get-profile", getProfile);
profileRouter.patch("/edit-profile", editProfile);
profileRouter.patch(
    "/update-profile-image",
    imageUploadMiddleware.single("profile-image"),
    updateProfileImage
);
profileRouter.get("/get-profile-image", getProfileImage);

module.exports = { profileRouter };
