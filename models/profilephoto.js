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
        }
    }
    ProfilePhoto.init(
        {
            type: DataTypes.STRING,
            name: DataTypes.STRING,
            blob: DataTypes.BLOB,
        },
        {
            sequelize,
            tableName: "profilePhotos",
            modelName: "profilePhoto",
        }
    );
    return ProfilePhoto;
};
