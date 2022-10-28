const { Department } = require('../models');
const { faker } = require('@faker-js/faker');

const set = new Set();
while (set.size < 10) {
  set.add(faker.commerce.department());
}

module.exports = () => Department.bulkCreate([...set].map(el => ({ name: el })));
