const { Project, Task, User, Post } = require('./../models');

const projectControllers = {
  getAll: async (req, res) => {
    try {
      const projects = await Project.findAll({
        where: {
          manager_id: req.session.user_id
        },
        include: [
          {
            model: Task
          },
          {
            model: User,
            through: 'project_user',
            as: 'team',
            attributes: ['name', 'avatar'],
            order: ['id']
          }]
      });

      if (!projects) return res.status(404).json({ message: 'No data found' });

      res.json({ projects });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  getById: async (req, res) => {
    const roleId = req.session.user_id;
    try {
      const project = await Project.findOne({
        where: {
          id: req.params.id
        },
        include: [
          {
            model: Task,
            include: User
          },
          {
            model: User,
            through: 'project_user',
            as: 'team',
            attributes: ['name', 'avatar'],
            order: ['id']
          },
          {
            model: Post,
            include: User
          }]
      });

      if (!project) return res.status(404).json({ message: 'No data found' });

      const projectData = project.get({ plain: true });
      // match manager's id
      if (projectData.manager_id === roleId) {
        res.send(projectData);
      } else {
        return res.status(400).json({ message: 'unauthorized get action!' });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  createOne: (req, res) => {
    Project.create({ ...req.body, manager_id: req.session.user_id })
      .then(dbData => res.json(dbData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  deleteOne: (req, res) => {
    Project.destroy({
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
    Project.update(req.body, {
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

module.exports = projectControllers;
