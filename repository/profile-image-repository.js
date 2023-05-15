const { profilePhoto } = require("../models");
class ProfileImageRepository {
    async createProfileImage(userId) {
        const profileImage = await profilePhoto.create({ userId });

        return profileImage;
    }

    async findProfileImageByUserId(userId) {
        const profileImage = await profilePhoto.findOne({
            where: {
                userId,
            },
        });

        return profileImage;
    }

    async updateProfileImage(payload) {
        const { type, name, blob, userId } = payload;

        const newProfileImage = await profilePhoto.update(
            {
                type,
                name,
                // blob : ,
            },
            {
                where: {
                    userId,
                },
                returning: true,
            }
        );

        const [_numAffectedRows, [updatedData]] = newProfileImage;

        return updatedData;
    }
}

module.exports = { ProfileImageRepository };
