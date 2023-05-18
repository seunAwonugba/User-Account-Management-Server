const express = require("express");
const { implementOtp } = require("../controller/auth");
const otpRouter = express.Router();

otpRouter.patch("/set-up-otp", implementOtp);

module.exports = { otpRouter };
