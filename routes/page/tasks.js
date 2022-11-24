const { Task, User, Project } = require('../../models');
const router = require('express').Router({ mergeParams: true });

router.get('/', async (req, res) => {
  const pageSize = 10;
  const currentPage = +req.query.page || 1;

  try {
    const tasks = await Task.findAndCountAll({
      where: {
        manager_id: req.session.user_id
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

    res.render('tasks', {
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
});

module.exports = router;
