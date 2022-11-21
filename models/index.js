const { DataTypes } = require('sequelize');
const _Comment = require('./Comment');
const _Department = require('./Department');
const _Level = require('./Level');
const _Position = require('./Position');
const _Post = require('./Post');
const _Result = require('./Result');
const _Task = require('./Task');
const _User = require('./User');
const _Access = require('./Access');
const _Session = require('./Session');
const _Project = require('./Project');
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
  const Session = _Session(sequelize, DataTypes);
  const Access = _Access(sequelize, DataTypes);
  const Project = _Project(sequelize, DataTypes);

  Position.belongsTo(Department, {
    foreignKey: 'department_id'
  });
  Department.hasMany(Position, {
    foreignKey: 'department_id'
  });

  User.belongsTo(Access, {
    foreignKey: 'access_id'
  });

  Access.hasMany(User, {
    foreignKey: 'access_id'
  });

  User.belongsTo(Level, {
    foreignKey: 'level_id'
  });
  Level.hasMany(User, {
    foreignKey: 'level_id'
  });
  User.belongsTo(Position, {
    foreignKey: 'position_id'
  });
  Position.hasMany(User, {
    foreignKey: 'position_id'
  });

  Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
  });
  Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
  });
  Post.belongsTo(Task, {
    foreignKey: 'task_id',
    onDelete: 'CASCADE'
  });
  Task.hasMany(Post, {
    foreignKey: 'task_id',
    onDelete: 'CASCADE'
  });
  Result.belongsTo(Task, {
    foreignKey: 'task_id',
    onDelete: 'CASCADE'
  });
  Task.hasMany(Result, {
    foreignKey: 'task_id',
    onDelete: 'CASCADE'
  });
  Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
  });
  User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
  });

  Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
  });

  User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
  });

  Task.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user'
  });

  Project.hasMany(Task, {
    foreignKey: 'project_id',
    as: 'tasks'
  });

  Task.belongsTo(Project, {
    foreignKey: 'project_id',
    as: 'project'
  });

  User.hasMany(Project, {
    foreignKey: 'manager_id',
    as: 'projects',
    onDelete: 'SET NULL'
  });

  Project.belongsTo(User, {
    foreignKey: 'manager_id',
    as: 'manager'
  });

  User.hasMany(Task, {
    foreignKey: 'user_id',
    as: 'tasksToDo'
  });

  Task.belongsTo(User, {
    foreignKey: 'manager_id',
    as: 'manager'
  });

  User.hasMany(Task, {
    foreignKey: 'manager_id',
    as: 'assisnedTasks'
  });

  User.belongsTo(User, {
    foreignKey: 'manager_id',
    as: 'manager'
  });

  User.hasMany(User, {
    foreignKey: 'manager_id',
    as: 'team_members'
  });

  return {
    Comment,
    Department,
    Level,
    Position,
    Post,
    Result,
    Task,
    User,
    Session,
    Access,
    Project
  };
}

module.exports = initModels(sequelize);
