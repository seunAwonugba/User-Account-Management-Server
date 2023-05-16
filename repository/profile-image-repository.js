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

    async updateProfileImage(payload, userId) {
        const { fieldname, originalname, mimetype, filename, path, size } =
            payload;

        const newProfileImage = await profilePhoto.update(
            {
                fieldName: fieldname,
                originalName: originalname,
                mimeType: mimetype,
                fileName: filename,
                path,
                size,
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
