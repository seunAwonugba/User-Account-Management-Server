const express = require("express");
const { implementOtp, verifyOtp } = require("../controller/auth");
const otpRouter = express.Router();

otpRouter.patch("/set-up-otp", implementOtp);
otpRouter.patch("/verify-otp", verifyOtp);

module.exports = { otpRouter };
