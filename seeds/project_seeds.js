const { faker } = require('@faker-js/faker');

const { Project } = require('../models');

const arr = [];
for (let i = 1; i < 6; i++) {
  arr.push({
    title: faker.lorem.lines(1),
    manager_id: 2
  });
};

module.exports = () => Project.bulkCreate(arr);
