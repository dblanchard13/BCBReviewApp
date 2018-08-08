'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn({ tableName: 'users' }, 'dateOfBirth', Sequelize.DATE)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn({ tableName: 'users' }, 'dateOfBirth')
  }
};
