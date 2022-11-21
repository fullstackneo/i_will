const { User, Post, Position, Department, Comment, Task } = require('../../models');
const { getTeamIds } = require('../../utils/helpers');

const router = require('express').Router();

router.get('/team', async (req, res) => {
  // hr retrieve all staff
  // manager retrieve teams
  let where = {};

  if (req.session.role === 'manager') {
    const ids = await getTeamIds(req.session.user_id);
    where = { id: ids };
  }
  User.findAll({
    where,
    attributes: {
      exclude: ['password', 'manager_id', 'position_id', 'level_id']
    },
    include: [{
      model: User, as: 'manager', attributes: ['name']
    }, {
      model: User, as: 'team_members', attributes: ['name']
    }, {
      model: Post, include: Comment
    }, {
      model: Position, include: Department
    }, {
      model: Task, as: 'tasksToDo'
    }]
  })
    .then(dbData => {
      if (!dbData) {
        res.status(404).json({
          message: 'No data found!'
        });
        return;
      }
      res.render('team', {
        team: dbData.map(el => el.get({ plain: true })),
        current_page: 'Team',
        loggedIn: req.session.loggedIn,
        user_menu: req.session.user_menu,
        layout: 'main'
      });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});
module.exports = router;
