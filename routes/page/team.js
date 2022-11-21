const { User, Post, Position, Department, Comment, Task, Access } = require('../../models');
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
      model: User, as: 'team', attributes: ['name']
    }, {
      model: Post, include: Comment
    }, {
      model: Position, include: Department
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
        loggedUser: {
          menu: req.session.user_menu,
          name: req.session.username,
          id: req.session.user_id,
          avatar: req.session.avatar
        },
        layout: 'main'
      });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});
module.exports = router;
