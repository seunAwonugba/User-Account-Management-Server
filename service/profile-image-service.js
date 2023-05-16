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
        console.log(payload);
        if (!payload) {
            throw new UnprocessableEntity("Select image");
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
}

module.exports = { ProfileImageService };
