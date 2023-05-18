"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("otps", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            otpAscii: {
                type: Sequelize.STRING,
            },
            otpHex: {
                type: Sequelize.STRING,
            },
            otpBase32: {
                type: Sequelize.STRING,
            },
            otpAuthUrl: {
                type: Sequelize.STRING,
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "User id is required",
                    },
                },
                unique: true,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("otps");
    },
};
