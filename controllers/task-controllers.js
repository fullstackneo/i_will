const { getTaskManagerId, getTaskStaffId, getTeamIds } = require('../utils/helpers');
const { Task, User } = require('./../models');

const taskControllers = {
  getAll: async (req, res) => {
    try {
      const tasks = await Task.findAll({
        where: {
          user_id: req.session.user_id
        },
        include: [{
          model: User,
          as: 'belongsTo'
        }, {
          model: User,
          as: 'assignedBy'
        }]
      });

      if (!tasks) return res.status(404).json({ message: 'No data found' });

      // for staff
      if (req.session.role === 'staff') return res.json(tasks);
      // for manager
      const teamTasks = await Task.findAll({
        where: {
          manager_id: req.session.user_id
        },
        include: {
          model: User,
          as: 'belongsTo'
        }
      });
      res.json({ tasks, teamTasks });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  getById: async (req, res) => {
    const role = req.session.role;
    const roleId = req.session.user_id;
    try {
      const task = await Task.findOne({
        where: {
          id: req.params.id
        },
        include: [{
          model: User,
          as: 'belongsTo'
        }, {
          model: User,
          as: 'assignedBy'
        }]
      });

      if (!task) return res.status(404).json({ message: 'No data found' });

      const taskData = task.get({ plain: true });

      if (taskData.user_id === roleId || (role === 'manager' && taskData.manager_id === roleId)) {
        res.send(taskData);
      } else {
        return res.status(400).json({ message: 'unauthorized get action!' });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  create: (req, res) => {
    // manager creates tasks
    if (res.session.role !== 'manger' || !getTeamIds.includes(parseFloat(req.session.user_id))) {
      return res.status(400).json({ message: 'unauthorized action!' });
    }

    Task.create({ ...req.body, manager_id: req.session.user_id })
      .then(dbData => res.json(dbData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  delete: (req, res) => {
    // manager deletes tasks
    if (getTaskManagerId(req.params.id) !== req.session.user_id) {
      return res.status(400).json({ message: 'unauthorized action!' });
    }

    Task.destroy({
      where: {
        id: req.params.id
      }
    })
      .then((dbData) => {
        if (!dbData) {
          res.status(404).json({ message: 'No data found' });
          return;
        }
        res.json(dbData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  update: (req, res) => {
    // staff can update his task: i_will section
    // manager can update team tasks except i_will section
    if (getTaskStaffId(req.params.id) === req.session.user_id) {
      req.body = { i_will: req.body.i_will };
    } else {
      if (req.session.role === 'manager') {
        if (getTaskManagerId(req.params.id) !== req.session.user_id) {
          return res.json({ message: 'task not assigned by current manager!' });
        } else {
          delete req.body.i_will;
        }
      }
      return res.json({ message: 'task not belonging to current user!' });
    }

    Task.update(req.body, {
      where: {
        id: req.params.id
      }
    })
      .then((dbData) => {
        if (!dbData[0]) {
          res.status(404).json({ message: 'No data found' });
          return;
        }
        res.json(dbData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }
};

module.exports = taskControllers;
