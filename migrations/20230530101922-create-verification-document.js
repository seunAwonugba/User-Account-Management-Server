"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("verificationDocuments", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            fieldName: {
                type: Sequelize.STRING,
            },
            originalName: {
                type: Sequelize.STRING,
            },
            mimeType: {
                type: Sequelize.STRING,
            },
            fileName: {
                type: Sequelize.STRING,
            },
            path: {
                type: Sequelize.STRING,
            },
            docs: {
                type: Sequelize.STRING,
            },
            size: {
                type: Sequelize.STRING,
            },
            documentType: {
                type: Sequelize.STRING,
            },
            documentNumber: {
                type: Sequelize.STRING,
            },
            userId: {
                type: Sequelize.INTEGER,
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
        await queryInterface.dropTable("verificationDocuments");
    },
};
