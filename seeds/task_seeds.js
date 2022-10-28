const { faker } = require('@faker-js/faker');

const { Task } = require('../models');

const arr = [];
for (let i = 0; i < 60; i++) {
  arr.push({
    title: faker.lorem.lines(1),
    user_id: faker.datatype.number({
      min: 1,
      max: 39
    }),
    manager_id: Math.floor(faker.datatype.number({
      min: 1,
      max: 39
    }) / 5 + 1),
    objective: faker.lorem.lines(2),
    i_will: faker.lorem.lines(2),
    createdAt: faker.date.past(10, '2020-01-01T00:00:00.000Z'),
    updatedAt: new Date()
  });
};

module.exports = () => Task.bulkCreate(arr);
