const { StatusCodes } = require("http-status-codes");
const { ProfileService } = require("../service/profile-service");
const { ProfileImageService } = require("../service/profile-image-service");

const profileService = new ProfileService();
const profileImageService = new ProfileImageService();

const getProfile = async (req, res, next) => {
    try {
        const profile = await profileService.getProfile(req.user.id);
        return res.status(StatusCodes.OK).json(profile);
    } catch (error) {
        next(error);
    }
};

const editProfile = async (req, res, next) => {
    try {
        const newProfile = await profileService.editProfile(
            req.body,
            req.user.id
        );
        return res.status(StatusCodes.CREATED).json(newProfile);
    } catch (error) {
        next(error);
    }
};

const updateProfileImage = async (req, res, next) => {
    try {
        const updateProfileImage = await profileImageService.updateProfileImage(
            req.file,
            req.user.id
        );
        return res.status(StatusCodes.CREATED).json(updateProfileImage);
    } catch (error) {
        next(error);
    }
};

const getProfileImage = async (req, res, next) => {
    try {
        const profileImage = await profileImageService.getProfileImage(
            req.user.id
        );
        return res.status(StatusCodes.OK).json(profileImage);
    } catch (error) {
        next();
    }
};

module.exports = {
    getProfile,
    editProfile,
    updateProfileImage,
    getProfileImage,
};
