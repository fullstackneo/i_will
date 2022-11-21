const router = require('express').Router();

router.get('/', (req, res) => {
  // TODO: hardcode user data
  req.session.loggedIn = true;
  req.session.role = 'manager';
  req.session.username = 'Neo';
  req.session.user_id = 2;
  req.session.avatar = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';
  req.session.user_menu = [{
    name: 'Profile',
    path: '/profile',
    icon: ''
  }, {
    name: 'Projects',
    path: '/projects',
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
  return res.redirect('/profile');
  res.render('homepage', {
    loggedUser: {
      menu: req.session.user_menu,
      name: req.session.username,
      id: req.session.user_id,
      avatar: req.session.avatar
    },
    layout: 'main'
  });
});

module.exports = router;
