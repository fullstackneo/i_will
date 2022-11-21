const { faker } = require('@faker-js/faker');

const { User } = require('../models');

const arr = [];
for (let i = 1; i < 40; i++) {
  arr.push({
    name: faker.name.fullName(),
    email: faker.internet.email(),
    password: '123',
    phone: faker.phone.number('###-###-####'),
    linkedin_url: faker.internet.url(),
    level_id: Math.floor(Math.random(0, 1) * 3) + 1,
    position_id: Math.floor(Math.random(0, 1) * 10) + 1,
    manager_id: Math.floor(i / 5 + 1),
    access_id: faker.datatype.number({
      min: 1,
      max: 4,
      precision: 1
    }),
    avatar: faker.internet.avatar()
  });
}

module.exports = () => User.bulkCreate(arr, { individualHooks: true });
