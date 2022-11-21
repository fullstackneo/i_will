const sequelize = require('../config/connection');
const seedDepartment = require('./department_seeds');
const seedPosition = require('./position_seeds');
const seedLevel = require('./level_seeds');
const seedUser = require('./user_seeds');
const seedProject = require('./project_seeds');
const seedTask = require('./task_seeds');
const seedResult = require('./result_seeds');
const seedPost = require('./post_seeds');
const seedAccess = require('./access_seeds');
const seedComment = require('./comment_seeds');
const seedProject_User = require('./project_user_seeds');

async function seedAll () {
  await sequelize.sync({ force: true });
  await seedAccess();
  await seedLevel();
  await seedDepartment();
  await seedPosition();
  await seedUser();
  await seedProject();
  await seedProject_User();
  await seedTask();
  await seedResult();
  await seedPost();
  await seedComment();
}
seedAll();
