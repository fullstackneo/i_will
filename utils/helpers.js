const { User, Session, Task } = require('../models');

function getTeamIds (managerId) {
  return User.findAll({
    where: {
      manager_id: managerId
    },
    attributes: ['id']
  }).then(data => {
    return data.map(el => el.get({ plain: true }).id);
  });
}

function isSameSession (sessionId) {
  return Session.findOne({ where: { sid: sessionId } }).then(data => data.get({ plain: true }).sid);
}

function getStaffManagerId (staffId) {
  User.findOne({ where: { id: staffId } })
    .then(dbData => {
      return dbData.get({ plain: true }).manager_id;
    });
}

function getTaskManagerId (taskId) {
  Task.findOne({ where: { id: taskId } })
    .then(dbData => {
      return dbData.get({ plain: true }).manager_id;
    });
}

function getTaskStaffId (taskId) {
  Task.findOne({ where: { id: taskId } })
    .then(dbData => {
      return dbData.get({ plain: true }).user_id;
    });
}

function getTasks (role, roleId) {
  const condition = {};
  if (role === 'staff') {
    condition.user_id = roleId;
  } else if (role === 'manager') {
    condition.manager_id = roleId;
  }

  return Task.findAll({
    where: condition,
    include: [{
      model: User,
      as: 'belongsTo'
    }, {
      model: User,
      as: 'assignedBy'
    }]
  }).then(data => data.map(el => el.get({ plain: true }))); ;
}

module.exports = { getTeamIds, isSameSession, getTasks, getStaffManagerId, getTaskManagerId, getTaskStaffId };
