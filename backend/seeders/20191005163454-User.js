'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
        "Users",
        [
            {
                name: 'Volod',
                email: 'volod@gmail.com',
                password: '123123',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Jon Doe',
                email: 'jondoe@example.com',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ],
        {},
    ),

    down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
