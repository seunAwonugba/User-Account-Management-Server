const { token } = require("../models");

class TokenRepository {
    async createToken({ accessToken, userId }) {
        const createToken = await token.create({
            token: accessToken,
            userId,
        });

        return createToken;
    }

    async findToken(accessToken) {
        const findToken = await token.findOne({
            where: {
                token: accessToken,
            },
        });

        return findToken;
    }

    async findTokenByUserId(userId) {
        const findToken = await token.findOne({
            where: {
                userId,
            },
        });

        return findToken;
    }

    async deleteToken(userId) {
        const deleteToken = await token.destroy({
            where: {
                userId,
            },
        });

        return deleteToken;
    }
}

module.exports = { TokenRepository };
