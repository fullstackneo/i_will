const { Project, Task, User } = require('../../models');

const router = require('express').Router({ mergeParams: true });

router.get('/', async (req, res) => {
  try {
    const projects = await Project.findAll({
      where: {
        manager_id: req.session.user_id
      },
      include: [
        Task,
        {
          model: User,
          through: 'project_user',
          attributes: ['name', 'avatar'],
          as: 'team'
        }
      ]
    });
    if (!projects) return res.status(404).json({ message: 'No data found' });
    res.render('projects', {
      current_page: 'projects',
      loggedUser: {
        menu: req.session.user_menu,
        name: req.session.username,
        id: req.session.user_id,
        avatar: req.session.avatar
      },
      projects: projects.map(el => el.get({ plain: true })),
      // projects,
      layout: 'main'
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:projectId', (req, res) => {
  res.redirect(`/projects/${req.params.projectId}/tasks`);
});

module.exports = router;
