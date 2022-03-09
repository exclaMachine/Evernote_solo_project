'use strict';
// const faker = require('faker');
const { faker } = require('@faker-js/faker');


module.exports = {
  up: (queryInterface, Sequelize) => {
    const seedNotebooks = (num) => {
      let i = 0;
      let notebooksArr = [];
      while (i < num) {
        const notebook = {
          userId: Math.ceil(Math.random() * 3), // 3 users (ceil so we don't get 0)
          title: faker.commerce.department(),
          createdAt: new Date(),
          updatedAt: new Date(),
        }
        notebooksArr.push(notebook);
        i++;
      }
      return notebooksArr;
    }

      return queryInterface.bulkInsert('Notebooks', seedNotebooks(22), {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Notebooks', null, {});
  }
};
