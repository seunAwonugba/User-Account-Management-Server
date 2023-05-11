const { profile } = require("../models");

class ProfileRepository {
    async createUserProfile({ firstName, lastName, email, userId }) {
        const data = { firstName, lastName, email, userId };
        const createProfile = profile.create({ ...data });

        return createProfile;
    }

    async getProfile(userId) {
        const userProfile = await profile.findOne({
            where: {
                userId,
            },
        });

        return userProfile;
    }

    async editProfile(payload) {
        const {
            photo,
            firstName,
            lastName,
            email,
            gender,
            age,
            dob,
            maritalStatus,
            nationality,
            userId,
        } = payload;

        const newProfile = await profile.update(
            {
                photo,
                firstName,
                lastName,
                email,
                gender,
                age,
                dob,
                maritalStatus,
                nationality,
            },
            {
                where: {
                    userId,
                },
                returning: true,
            }
        );

        const [_numAffectedRows, [updatedData]] = newProfile;

        return updatedData;
    }
}

module.exports = { ProfileRepository };
