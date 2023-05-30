"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class VerificationDocument extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            VerificationDocument.belongsTo(models.user);
        }
    }
    VerificationDocument.init(
        {
            fieldName: DataTypes.STRING,
            originalName: DataTypes.STRING,
            mimeType: DataTypes.STRING,
            fileName: DataTypes.STRING,
            path: DataTypes.STRING,
            image: DataTypes.STRING,
            size: DataTypes.STRING,
            documentType: DataTypes.STRING,
            documentNumber: DataTypes.STRING,
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
                    msg: "Document unique to a user",
                },
            },
        },
        {
            sequelize,
            tableName: "verificationDocuments",
            modelName: "verificationDocument",
        }
    );
    return VerificationDocument;
};
