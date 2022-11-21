const { faker } = require('@faker-js/faker');

const { Position } = require('../models');

const set = new Set();
while (set.size < 10) {
  set.add(faker.name.jobTitle());
}
const arr = [...set].map(el => ({
  name: el,
  department_id: Math.floor(Math.random(0, 1) * 10) + 1
}));

module.exports = () => Position.bulkCreate(arr);
