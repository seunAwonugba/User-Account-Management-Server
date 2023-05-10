const { StatusCodes } = require("http-status-codes");
const { ProfileService } = require("../service/profile-service");

const profileService = new ProfileService();

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
        const newProfile = await profileService.editProfile(req.body);
        return res.status(StatusCodes.CREATED).json(newProfile);
    } catch (error) {
        next(error);
    }
};

module.exports = { getProfile, editProfile };
