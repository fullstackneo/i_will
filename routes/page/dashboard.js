const router = require('express').Router();
router.get('/dashboard', (req, res) => {
  res.render('dashboard', {
    current_page: req.session.currentPage,
    user_menu: 'Dashboard',
    layout: 'main'
  });
});

module.exports = router;
