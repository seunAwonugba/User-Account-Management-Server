const { StatusCodes } = require("http-status-codes");
const { UserService } = require("../service/user-service");

const userService = new UserService();

const getUser = async (req, res, next) => {
    try {
        const user = await userService.getUser(req.user.id);
        return res.status(StatusCodes.OK).json(user);
    } catch (error) {
        next(error);
    }
};

module.exports = { getUser };
