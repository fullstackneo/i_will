const router = require('express').Router();

router.get('/', (req, res) => {
  // TODO: hardcode user data
  req.session.loggedIn = true;
  req.session.role = 'manager';
  req.session.username = 'Neo';
  req.session.user_id = 2;
  req.session.user_menu = [{
    name: 'Dashboard',
    path: '/dashboard',
    icon: ''
  }, {
    name: 'Team',
    path: '/team',
    icon: ''
  }, {
    name: 'Tasks',
    path: '/tasks',
    icon: ''
  }];

  res.render('homepage', {
    current_page: req.session.currentPage,
    user_menu: req.session.user_menu,
    layout: 'main'
  });
});

module.exports = router;
