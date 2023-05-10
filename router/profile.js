const express = require("express");
const { getProfile, editProfile } = require("../controller/profile");

const profileRouter = express.Router();

profileRouter.get("/get-profile", getProfile);
profileRouter.patch("/edit-profile", editProfile);

module.exports = { profileRouter };
