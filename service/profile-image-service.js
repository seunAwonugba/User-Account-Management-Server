const { UserRepository } = require("../repository/user-repository");
const { user } = require("../models");
const { BadRequest, UnprocessableEntity } = require("../error");
class ProfileImageService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async uploadProfileImage(payload) {
        const user = await this.userRepository.findUserById(payload.userId);

        if (!user) {
            throw new BadRequest("User not found");
        }

        if (payload.file == undefined) {
            throw new UnprocessableEntity(
                "Select a image to update profile image "
            );
        }

        
    }
}
