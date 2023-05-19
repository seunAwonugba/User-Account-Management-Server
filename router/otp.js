const express = require("express");
const {
    implementOtp,
    verifyOtp,
    validateOtp,
    disableOtp,
} = require("../controller/auth");
const otpRouter = express.Router();

otpRouter.patch("/set-up-otp", implementOtp);
otpRouter.patch("/verify-otp", verifyOtp);
otpRouter.post("/validate-otp", validateOtp);
otpRouter.patch("/disable-otp", disableOtp);

module.exports = { otpRouter };
