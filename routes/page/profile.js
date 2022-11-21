const { User, Post, Position, Department, Access, Comment } = require('../../models');

const router = require('express').Router();
router.get('/profile', (req, res) => {
  User.findOne({
    where: {
      id: req.session.user_id
    },
    attributes: {
      exclude: ['password', 'manager_id', 'position_id', 'level_id']
    },
    include: [
      { model: User, as: 'manager', attributes: ['name'] },
      {
        model: User,
        as: 'team',
        attributes: ['name', 'avatar'],
        include: [Position]
      },
      { model: Post, include: Comment },
      { model: Position, include: Department },
      { model: Access }]
  })
    .then(dbData => {
      if (!dbData) {
        res.status(404).json({
          message: 'No data found!'
        });
        return;
      }
      res.render('profile', {
        loggedUser: {
          menu: req.session.user_menu,
          name: req.session.username,
          id: req.session.user_id,
          avatar: req.session.avatar
        },
        user: dbData.get({ plain: true }),
        layout: 'main'
      });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
