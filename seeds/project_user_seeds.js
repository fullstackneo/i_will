const { Project_User } = require('../models');

const arr = [];
for (let i = 1; i < 6; i++) {
  for (let j = 1; j < 40; j++) {
    arr.push({
      project_id: i,
      user_id: j
    });
  }
};

module.exports = () => Project_User.bulkCreate(arr, { ignoreDuplicates: true });
