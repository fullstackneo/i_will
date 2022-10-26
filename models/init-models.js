const DataTypes = require('sequelize').DataTypes;
const _comment = require('./Comment');
const _department = require('./Department');
const _level = require('./Level');
const _position = require('./Position');
const _post = require('./Post');
const _result = require('./Result');
const _task = require('./Task');
const _user = require('./User');

function initModels (sequelize) {
  const comment = _comment(sequelize, DataTypes);
  const department = _department(sequelize, DataTypes);
  const level = _level(sequelize, DataTypes);
  const position = _position(sequelize, DataTypes);
  const post = _post(sequelize, DataTypes);
  const result = _result(sequelize, DataTypes);
  const task = _task(sequelize, DataTypes);
  const user = _user(sequelize, DataTypes);

  position.belongsTo(department, {
    as: 'department',
    foreignKey: 'department_id'
  });
  department.hasMany(position, {
    as: 'positions',
    foreignKey: 'department_id'
  });
  user.belongsTo(level, {
    as: 'level',
    foreignKey: 'level_id'
  });
  level.hasMany(user, {
    as: 'users',
    foreignKey: 'level_id'
  });
  user.belongsTo(position, {
    as: 'position',
    foreignKey: 'position_id'
  });
  position.hasMany(user, {
    as: 'users',
    foreignKey: 'position_id'
  });
  comment.belongsTo(post, {
    as: 'post',
    foreignKey: 'post_id'
  });
  post.hasMany(comment, {
    as: 'comments',
    foreignKey: 'post_id'
  });
  post.belongsTo(task, {
    as: 'task',
    foreignKey: 'task_id'
  });
  task.hasMany(post, {
    as: 'posts',
    foreignKey: 'task_id'
  });
  result.belongsTo(task, {
    as: 'task',
    foreignKey: 'task_id'
  });
  task.hasMany(result, {
    as: 'results',
    foreignKey: 'task_id'
  });
  comment.belongsTo(user, {
    as: 'user',
    foreignKey: 'user_id'
  });
  user.hasMany(comment, {
    as: 'comments',
    foreignKey: 'user_id'
  });
  post.belongsTo(user, {
    as: 'user',
    foreignKey: 'user_id'
  });
  user.hasMany(post, {
    as: 'posts',
    foreignKey: 'user_id'
  });
  task.belongsTo(user, {
    as: 'user',
    foreignKey: 'user_id'
  });
  user.hasMany(task, {
    as: 'tasks',
    foreignKey: 'user_id'
  });
  task.belongsTo(user, {
    as: 'manager',
    foreignKey: 'manager_id'
  });
  user.hasMany(task, {
    as: 'manager_tasks',
    foreignKey: 'manager_id'
  });
  user.belongsTo(user, {
    as: 'manager',
    foreignKey: 'manager_id'
  });
  user.hasMany(user, {
    as: 'users',
    foreignKey: 'manager_id'
  });

  return {
    comment,
    department,
    level,
    position,
    post,
    result,
    task,
    user
  };
}
module.exports = initModels;
