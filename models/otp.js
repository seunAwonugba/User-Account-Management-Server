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
            otpAscii: DataTypes.STRING,
            otpHex: DataTypes.STRING,
            otpBase32: DataTypes.STRING,
            otpAuthUrl: DataTypes.STRING,
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: {
                    args: true,
                    msg: "OTP unique to a user",
                },
            },
        },
        {
            sequelize,
            tableName: "otps",
            modelName: "otp",
        }
    );
    return Otp;
};
