'use strict';
const faker = require('faker');


module.exports = {
  up: (queryInterface, Sequelize) => {
    const seedNotes = (num) => {
      let i = 0;
      let notesArr = [];
      while (i < num) {
        const note = {
          userId: Math.ceil(Math.random() * 3), // 3 users (ceil so we don't get 0)
          notebookId: Math.ceil(Math.random() * 20), //20 notebooks
          title: faker.commerce.color(),
          content:  faker.fake('{{random.arrayElement(["Today there was", "Sometimes I wish I was", "Wouldn\'t it be cool to have","My new arch-rival: ", "Five Words:", "Sometimes life is like"])}} a {{name.jobArea}} {{name.jobType}} {{animal.bear}} {{random.arrayElement(["wearing","destroying", "walking","pooping","eating"])}} some {{commerce.productName}} {{random.arrayElement(["😊","🙃","🤪","🤓","🤯","😴","💩","👻","👽","🤖","👾","👐","🖖","✌️","🤟","🤘","🤙","👋","🐭","🦕","🦖","🐉"])}}'),
          createdAt: new Date(),
          updatedAt: new Date(),
        }
        notesArr.push(note);
        i++;
      }
      return notesArr;
    }

      return queryInterface.bulkInsert('Notes', seedNotes(25) , {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Notes', null, {});
  }
};
