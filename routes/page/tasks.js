const { Task, User, Project } = require('../../models');

const router = require('express').Router();
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: {
        user_id: req.session.user_id
      },
      include: [{
        model: User,
        as: 'user'
      }, {
        model: User,
        as: 'manager'
      }, {
        model: Project,
        as: 'project'
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
        as: 'user'
      }
    });
    return res.json({ tasks, teamTasks });

    res.render('tasks', {
      current_page: 'Tasks',
      user_menu: req.session.user_menu,
      layout: 'main',
      teamTasks: teamTasks.map(el => el.get({ plain: true })),
      tasks: tasks.map(el => el.get({ plain: true }))
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
module.exports = router;
