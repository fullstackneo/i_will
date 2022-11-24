const { Project, Task, User, Position, Post, Comment } = require('../../models');

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

router.get('/:projectId/tasks', async (req, res) => {
  const pageSize = 10;
  const currentPage = +req.query.page || 1;
  try {
    const tasks = await Task.findAndCountAll({
      where: {
        project_id: req.params.projectId
      },
      include: [{
        model: User,
        as: 'user'
      },
      {
        model: User,
        as: 'manager'
      },
      {
        model: Project,
        as: 'project'
      }],
      limit: pageSize,
      offset: (currentPage - 1) * pageSize
    });

    if (!tasks.count) return res.status(404).json({ message: 'No data found' });

    // display pagination: result and page numbers
    const totalResults = tasks.count;
    const totalPages = Math.ceil(tasks.count / pageSize);
    if (currentPage > totalPages) {
      res.redirect(`/tasks?page=${totalPages}`);
    }
    const pagination = {
      currentPage,
      totalResults,
      totalPages
    };

    res.render('projectTasks', {
      loggedUser: {
        menu: req.session.user_menu,
        name: req.session.username,
        id: req.session.user_id,
        avatar: req.session.avatar
      },
      pagination,
      project: {
        id: req.params.projectId,
        tasks: tasks.rows.map(el => el.get({ plain: true }))
      },
      layout: 'main'
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:projectId/tasks/:taskId', async (req, res) => {
  try {
    const task = await Task.findOne({
      where: {
        id: req.params.taskId
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
            }
          ]
        }
      ]
    });
    if (!task) return res.status(404).json({ message: 'No data found' });

    const taskData = task.get({ plain: true });

    // console.log(taskData.manager_id);

    if (taskData.manager_id === req.session.user_id) {
      res.render('singleTask', {
        taskData,
        loggedUser: {
          menu: req.session.user_menu,
          name: req.session.username,
          id: req.session.user_id,
          avatar: req.session.avatar
        }
      });
    } else {
      return res.status(400).json({ message: 'unauthorized get action!' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
