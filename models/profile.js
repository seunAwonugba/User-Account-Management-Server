"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Profile extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Profile.belongsTo(models.user);
        }
    }
    Profile.init(
        {
            photo: { type: DataTypes.STRING, allowNull: true },
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "First name is required",
                    },
                },
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "Last name is required",
                    },
                },
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: {
                    args: true,
                    msg: "Email address already exist",
                },
                validate: {
                    isEmail: {
                        msg: "Please provide a valid email address",
                    },
                    notEmpty: {
                        msg: "Email address is required",
                    },
                },
            },
            gender: { type: DataTypes.STRING, allowNull: true },
            age: { type: DataTypes.INTEGER, allowNull: true },
            dob: { type: DataTypes.STRING, allowNull: true },
            maritalStatus: {
                type: DataTypes.ENUM,
                values: ["SINGLE", "MARRIED", "DIVORCED", "WIDOWED"],
                allowNull: true,
            },
            nationality: { type: DataTypes.STRING, allowNull: true },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: {
                    args: true,
                    msg: "Profile unique to a user",
                },
            },
        },
        {
            sequelize,
            tableName: "profiles",
            modelName: "profile",
        }
    );
    return Profile;
};
