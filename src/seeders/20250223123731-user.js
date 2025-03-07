'use strict'
const bcrypt = require('bcryptjs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const hashedPassword = await bcrypt.hash('password', 10)
    await queryInterface.bulkInsert(
      'users',
      [
        {
          username: 'admin1',
          email: 'admin1@example.com',
          password: hashedPassword,
          is_verified: true,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          username: 'admin2',
          email: 'admin2@example.com',
          is_verified: true,
          password: hashedPassword,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          username: 'user1',
          email: 'user1@example.com',
          password: hashedPassword,
          is_verified: true,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          username: 'user2',
          email: 'user2@example.com',
          password: hashedPassword,
          is_verified: true,
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {
        ignoreDuplicates: true
      }
    )
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', null, {})
  }
}
