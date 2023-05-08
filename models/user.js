"use strict";
const { Model } = require("sequelize");
const bcryptjs = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            User.hasOne(models.profile, {
                foreignKey: {
                    name: "userId",
                },
            });

            User.hasOne(models.token, {
                onDelete: "CASCADE",
                foreignKey: {
                    name: "userId",
                    allowNull: false,
                },
            });
        }

        toJSON() {
            return { ...this.get(), password: undefined };
        }
    }
    User.init(
        {
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
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "Password is required",
                    },
                },
            },
            isActive: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
        },
        {
            sequelize,
            tableName: "users",
            modelName: "user",
        }
    );

    User.beforeCreate(async (user) => {
        user.password = await bcryptjs.hash(user.password, 10);
    });

    User.beforeUpdate(async (user) => {
        if (user.changed("password")) {
            user.password = await bcryptjs.hash(user.password, 10);
        }
    });
    return User;
};
