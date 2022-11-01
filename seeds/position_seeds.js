const { faker } = require('@faker-js/faker');

const { Position } = require('../models');

const set = new Set();
while (set.size < 10) {
  set.add(faker.name.jobTitle());
}
const arr = [...set].map(el => ({
  name: el,
  access_id: faker.datatype.number({
    min: 1,
    max: 4
  }),
  department_id: Math.floor(Math.random(0, 1) * 10) + 1
}));

module.exports = () => Position.bulkCreate(arr);
