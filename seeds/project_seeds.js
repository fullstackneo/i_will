const { faker } = require('@faker-js/faker');

const { Project } = require('../models');

const arr = [];
for (let i = 0; i < 5; i++) {
  arr.push({
    title: faker.lorem.lines(1),
    manager_id: Math.floor(faker.datatype.number({
      min: 1,
      max: 39
    }) / 5 + 1)
  });
};

module.exports = () => Project.bulkCreate(arr);
