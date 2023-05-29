const { profile } = require("../models");
const { MapMaritalStatus } = require("../utils");

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

    async editProfile(payload, id) {
        const {
            firstName,
            lastName,
            email,
            gender,
            age,
            dob,
            maritalStatus,
            country,
        } = payload;

        const mapMaritalStatus = MapMaritalStatus(maritalStatus);

        const newProfile = await profile.update(
            {
                firstName,
                lastName,
                email,
                gender,
                age,
                dob,
                maritalStatus: mapMaritalStatus,
                nationality: country,
            },
            {
                where: {
                    userId: id,
                },
                returning: true,
            }
        );

        const [_numAffectedRows, [updatedData]] = newProfile;

        return updatedData;
    }
}

module.exports = { ProfileRepository };
