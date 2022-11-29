const { getTaskManagerId, getTaskStaffId, getTeamIds } = require('../utils/helpers');
const { Task, User, Project, Position, Post, Comment } = require('./../models');

const taskControllers = {
  getAll: async (req, res) => {
    const { project, assignee, page = 1 } = req.query;

    const pageSize = 10;

    try {
      const tasks = await Task.findAndCountAll({
        where: {
          manager_id: req.session.user_id
        },
        include: [{
          model: User,
          as: 'assignees',
          where: assignee ? { name: assignee } : {}
        },
        {
          model: User,
          as: 'manager'
        },
        {
          model: Project,
          as: 'project',
          where: project ? { title: project } : {}
        }],
        limit: pageSize,
        offset: (page - 1) * pageSize
      });
      if (!tasks) return res.status(404).json({ message: 'No data found' });

      // display pagination: result and page numbers
      const totalResults = tasks.count;
      const totalPages = Math.ceil(tasks.count / pageSize);

      const eligibleAssignees = await User.findAll({
        where: {
          manager_id: req.session.user_id
        },
        include: {
          model: Project,
          as: 'project',
          where: project ? { title: project } : {}
        }
      });
      console.log(eligibleAssignees.map(el => el.get({ plain: true })));

      // const eligibleProjects =;

      const pagination = {
        currentPage: +page,
        totalResults,
        totalPages
      };

      res.json({
        loggedUser: {
          menu: req.session.user_menu,
          name: req.session.username,
          id: req.session.user_id,
          avatar: req.session.avatar
        },
        pagination,
        tasks: tasks.rows.map(el => el.get({ plain: true })),
        layout: 'main'
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  getById: async (req, res) => {
    const roleId = req.session.user_id;

    try {
      const task = await Task.findOne({
        where: {
          id: req.params.id
        },
        include: [
          {
            model: User,
            as: 'assignees',
            include: { model: Position, include: 'department' }
          },
          {
            model: User,
            as: 'manager'
          },
          {
            model: Post,
            include: [
              { model: User, attributes: ['name', 'avatar'] },
              {
                model: Comment,
                attributes: ['content', 'createdAt', 'updatedAt'],
                include: {
                  model: User, attributes: ['name', 'avatar']
                }
              }]
          }
        ]
      });

      if (!task) return res.status(404).json({ message: 'No data found' });

      const taskData = task.get({ plain: true });

      if (taskData.manager_id === roleId) {
        res.send(taskData);
      } else {
        return res.status(400).json({ message: 'unauthorized get action!' });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  createOne: (req, res) => {
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

  deleteOne: (req, res) => {
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

  updateOne: (req, res) => {
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
