const { faker } = require('@faker-js/faker');
const { Comment } = require('../models');

const arr = [];
for (let i = 0; i < 100; i++) {
  arr.push({
    post_id: faker.datatype.number({
      min: 1,
      max: 60
    }),
    content: faker.lorem.lines(2),
    user_id: faker.datatype.number({
      min: 1,
      max: 39
    }),
    createdAt: faker.date.past(10, '2020-01-01T00:00:00.000Z'),
    updatedAt: new Date()
  });
}

module.exports = () => Comment.bulkCreate(arr);
