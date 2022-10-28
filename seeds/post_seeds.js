const { faker } = require('@faker-js/faker');
const { Post } = require('../models');

const arr = [];
for (let i = 0; i < 60; i++) {
  arr.push({
    task_id: i + 1,
    user_id: Math.floor(Math.random() * 39 + 1),
    content: faker.lorem.lines(3),
    createdAt: faker.date.past(10, '2020-01-01T00:00:00.000Z'),
    updatedAt: new Date()
  });
}

module.exports = () => Post.bulkCreate(arr);
