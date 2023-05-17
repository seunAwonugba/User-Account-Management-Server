"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Otp extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Otp.belongsTo(models.user);
        }
    }
    Otp.init(
        {
            otpEnabled: DataTypes.BOOLEAN,
            otpVerified: DataTypes.BOOLEAN,
            otpAscii: DataTypes.STRING,
            otpHex: DataTypes.STRING,
            otpBase32: DataTypes.STRING,
            otpAuthUrl: DataTypes.STRING,
        },
        {
            sequelize,
            tableName: "otps",
            modelName: "otp",
        }
    );
    return Otp;
};
