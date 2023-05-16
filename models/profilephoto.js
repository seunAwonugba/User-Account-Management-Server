"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class ProfilePhoto extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            ProfilePhoto.belongsTo(models.user);
        }
    }
    ProfilePhoto.init(
        {
            fieldName: DataTypes.STRING,
            originalName: DataTypes.STRING,
            mimeType: DataTypes.STRING,
            fileName: DataTypes.STRING,
            path: DataTypes.STRING,
            image: DataTypes.STRING,
            size: DataTypes.INTEGER,
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "User id is required",
                    },
                },
                unique: {
                    args: true,
                    msg: "Token unique to a user",
                },
            },
        },
        {
            sequelize,
            tableName: "profilePhotos",
            modelName: "profilePhoto",
        }
    );
    return ProfilePhoto;
};
