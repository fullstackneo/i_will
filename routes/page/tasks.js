const { Task, User, Project } = require('../../models');
const router = require('express').Router({ mergeParams: true });

router.get('/', async (req, res) => {
  const { project, assignee, page = 1 } = req.query;

  const pageSize = 10;
  try {
    const tasks = await Task.findAndCountAll({
      where: {
        manager_id: req.session.user_id
      },
      include: [
        {
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

    // display pagination: result and page numbers
    const totalResults = tasks.count;
    const totalPages = Math.ceil(tasks.count / pageSize);

    const pagination = {
      currentPage: page,
      totalResults,
      totalPages
    };

    const projectList = await Project.findAll({
      where: {
        manager_id: req.session.user_id
      },
      attributes: ['id', 'title'],
      include: [{
        model: User,
        as: 'team',
        attributes: ['name']
      }]
    }).then(res => res.map(el => {
      const projectObj = el.get({ plain: true });
      const projectName = projectObj.title;

      return {
        title: projectName,
        checked: project ? (project === projectName || project.includes(projectName)) : false
      };
    }));

    // get assignee list
    const assigneeList = await Task.findAll({
      where: {
        manager_id: req.session.user_id
      },
      attributes: ['id'],
      include: [
        {
          model: User,
          as: 'assignees',
          attributes: ['id', 'name']
        }],
      group: ['user_id']
    })
      .then(res => res.map(el => {
        const value = el.get({ plain: true }).assignees.name;
        return {
          name: value,
          checked: assignee ? (assignee === value || assignee.includes(value)) : false
        };
      }));

    const lists = {
      project: projectList,
      assignee: assigneeList
    };

    // return res.json(lists);
    res.render('tasks', {
      loggedUser: {
        menu: req.session.user_menu,
        name: req.session.username,
        id: req.session.user_id,
        avatar: req.session.avatar
      },
      lists,
      pagination,
      tasks: tasks?.rows.map(el => el.get({ plain: true })),
      layout: 'main'
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
