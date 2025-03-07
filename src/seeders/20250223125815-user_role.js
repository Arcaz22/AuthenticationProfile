'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'user_roles',
      [
        { user_id: 1, role_id: 1 },
        { user_id: 2, role_id: 1 },
        { user_id: 3, role_id: 2 },
        { user_id: 4, role_id: 2 }
      ],
      {
        ignoreDuplicates: true
      }
    )
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('user_roles', null, {})
  }
}
