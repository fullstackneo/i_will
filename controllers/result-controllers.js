const { Result, Task } = require('./../models');

const ResultControllers = {
  getAll: async (req, res) => {
  // manager gets personal results and team results
  // staff gets personal results
  // hr gets all results
    try {
      const taskData = await Result.findAll({});
      const role = req.session.role;

      if (!taskData) {
        return res.status(404).json({
          message: 'No data found'
        });
      }

      if (role === 'hr') {
        res.json(taskData);
      } else if (role === 'staff') {
        const tasks = taskData.map(el => el.get({ plain: true }));
        const personalTasks = tasks.filter(el => el.user_id === req.session.user_id);
        res.send({ personalTasks });
      } else if (role === 'manager') {
        const tasks = taskData.map(el => el.get({ plain: true }));
        const personalTasks = tasks.filter(el => el.user_id === req.session.user_id);
        const teamTasks = tasks.filter(el => el.manager_id === req.session.user_id);
        res.send({ personalTasks, teamTasks });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  getById: async (req, res) => {
    const id = req.params.id;
    await Result.findOne({
      where: { id },
      attributes: {
        exclude: []
      },
      include: [Task]
    })
      .then(dbData => {
        console.log(dbData);
        if (!dbData) {
          res.status(404).json({
            message: 'No data found'
          });
          return;
        }
        res.json(dbData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  create: (req, res) => {
    Result.create(req.body)
      .then(dbData => res.json(dbData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  delete: (req, res) => {
    Result.destroy({
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
    Result.update(req.body, {
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

module.exports = ResultControllers;
