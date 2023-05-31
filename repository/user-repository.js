const { user } = require("../models");

class UserRepository {
    async createUser(data) {
        const createUser = await user.create(data);

        return createUser;
    }

    async findUserById(id) {
        const findUser = await user.findOne({
            where: {
                id,
            },
        });

        return findUser;
    }

    async findUserByEmail(email) {
        const findUser = await user.findOne({
            where: {
                email,
            },
        });

        return findUser;
    }

    async deleteUserById(id) {
        const deleteUser = await user.destroy({
            where: {
                id,
            },
        });

        return deleteUser;
    }

    async updateUser(payload, id) {
        const updateUser = await user.update(
            {
                firstName: payload.firstName,
                lastName: payload.lastName,
                email: payload.email,
            },
            {
                where: {
                    id,
                },
                returning: true,
            }
        );
        const [_numAffectedRows, [updatedData]] = updateUser;

        return updatedData;
    }

    async updateVerificationStatus(id) {
        const updateUser = await user.update(
            {
                status: "PENDING",
            },
            {
                where: {
                    id,
                },
                returning: true,
            }
        );
        const [_numAffectedRows, [updatedData]] = updateUser;

        return updatedData;
    }
}

module.exports = { UserRepository };
