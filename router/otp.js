const express = require("express");
const { implementOtp, verifyOtp, validateOtp } = require("../controller/auth");
const otpRouter = express.Router();

otpRouter.patch("/set-up-otp", implementOtp);
otpRouter.patch("/verify-otp", verifyOtp);
otpRouter.post("/validate-otp", validateOtp);

module.exports = { otpRouter };
