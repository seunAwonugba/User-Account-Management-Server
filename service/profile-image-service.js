const { UserRepository } = require("../repository/user-repository");
const { user } = require("../models");
const { BadRequest, UnprocessableEntity } = require("../error");
const {
    ProfileImageRepository,
} = require("../repository/profile-image-repository");
class ProfileImageService {
    constructor() {
        this.userRepository = new UserRepository();
        this.profileImageRepository = new ProfileImageRepository();
    }

    async updateProfileImage(payload, userId) {
        if (!payload) {
            throw new UnprocessableEntity("Select image to upload");
        }

        const profileImage =
            await this.profileImageRepository.updateProfileImage(
                payload,
                userId
            );

        return {
            success: true,
            data: profileImage,
        };
    }

    async getProfileImage(userId) {
        const profileImage =
            await this.profileImageRepository.findProfileImageByUserId(userId);

        if (!profileImage.path) {
            throw new BadRequest("Image not found");
        }

        return {
            success: true,
            data: profileImage,
        };
    }
}

module.exports = { ProfileImageService };
