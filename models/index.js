const { DataTypes } = require('sequelize');
const _Comment = require('./Comment');
const _Department = require('./Department');
const _Level = require('./Level');
const _Position = require('./Position');
const _Post = require('./Post');
const _Result = require('./Result');
const _Task = require('./Task');
const _User = require('./User');
const sequelize = require('../config/connection');

function initModels (sequelize) {
  const Comment = _Comment(sequelize, DataTypes);
  const Department = _Department(sequelize, DataTypes);
  const Level = _Level(sequelize, DataTypes);
  const Position = _Position(sequelize, DataTypes);
  const Post = _Post(sequelize, DataTypes);
  const Result = _Result(sequelize, DataTypes);
  const Task = _Task(sequelize, DataTypes);
  const User = _User(sequelize, DataTypes);

  Position.belongsTo(Department, { foreignKey: 'department_id' });
  Department.hasMany(Position, { foreignKey: 'department_id' });
  User.belongsTo(Level, { foreignKey: 'level_id' });
  Level.hasMany(User, { foreignKey: 'level_id' });
  User.belongsTo(Position, { foreignKey: 'position_id' });
  Position.hasMany(User, { foreignKey: 'position_id' });
  Comment.belongsTo(Post, { foreignKey: 'post_id' });
  Post.hasMany(Comment, { foreignKey: 'post_id' });
  Post.belongsTo(Task, { foreignKey: 'task_id' });
  Task.hasMany(Post, { foreignKey: 'task_id' });
  Result.belongsTo(Task, { foreignKey: 'task_id' });
  Task.hasMany(Result, { foreignKey: 'task_id' });
  Comment.belongsTo(User, { foreignKey: 'user_id' });
  User.hasMany(Comment, { foreignKey: 'user_id' });
  Post.belongsTo(User, { foreignKey: 'user_id' });
  User.hasMany(Post, { foreignKey: 'user_id' });
  Task.belongsTo(User, { foreignKey: 'user_id' });
  User.hasMany(Task, { foreignKey: 'user_id' });
  Task.belongsTo(User, { foreignKey: 'manager_id' });
  User.hasMany(Task, { foreignKey: 'manager_id' });
  User.belongsTo(User, { foreignKey: 'manager_id' });
  User.hasMany(User, { foreignKey: 'manager_id' });

  return {
    Comment,
    Department,
    Level,
    Position,
    Post,
    Result,
    Task,
    User
  };
}

module.exports = initModels(sequelize);
