"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Carts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      bride: {
        type: Sequelize.STRING,
      },
      groom: {
        type: Sequelize.STRING,
      },
      weddingDate: {
        type: Sequelize.DATE,
      },
      contactNumber: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      PhotographyId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Photographies",
          key: "id",
        },
      },
      CatheringId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Catherings",
          key: "id",
        },
      },
      VenueId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Venues",
          key: "id",
        },
      },
      totalPrice: {
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
    await queryInterface.dropTable("Carts");
  },
};
