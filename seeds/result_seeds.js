
const { Result } = require('../models');

const arr = [];
for (let i = 1; i < 61; i++) {
  arr.push({
    task_id: i,
    score: Math.floor(Math.random() * 30 + 70)
  });
}

module.exports = () => Result.bulkCreate(arr);
