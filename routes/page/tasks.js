const { Task, User, Project, Position, Post, Comment } = require('../../models');

const router = require('express').Router({ mergeParams: true });

router.get('/tasks', async (req, res) => {
  try {
    const project = await Project.findOne({
      where: {
        id: req.params.projectId
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
        }]
    });

    if (!project) return res.status(404).json({ message: 'No data found' });
    // return res.json({
    //   user_menu: req.session.user_menu,
    //   project: project.get({ plain: true }),
    //   layout: 'main'
    // });
    res.render('singleProject', {
      loggedUser: {
        menu: req.session.user_menu,
        name: req.session.username,
        id: req.session.user_id,
        avatar: req.session.avatar
      },
      project: project.get({ plain: true }),
      layout: 'main'
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/tasks/:taskId', async (req, res) => {
  const roleId = req.session.user_id;
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

    if (taskData.manager_id === roleId) {
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
