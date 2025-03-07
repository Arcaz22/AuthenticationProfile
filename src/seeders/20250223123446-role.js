'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'roles',
      [{ name: 'admin' }, { name: 'user' }],
      {
        ignoreDuplicates: true
      }
    )
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('roles', null, {})
  }
}
