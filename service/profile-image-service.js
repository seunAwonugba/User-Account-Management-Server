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

    async updateProfileImage(payload) {
        const user = await this.userRepository.findUserById(payload.userId);

        if (!user) {
            throw new BadRequest("User not found");
        }

        if (payload.file == undefined) {
            throw new UnprocessableEntity(
                "Select a image to update profile image "
            );
        }

        const profileImage =
            await this.profileImageRepository.updateProfileImage(payload);

        return {
            success: true,
            data: profileImage,
        };
    }
}

module.exports = { ProfileImageService };
