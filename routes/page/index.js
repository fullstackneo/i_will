const router = require('express').Router();
const withAuth = require('./../../utils/auth');

const homePage = require('./homepage');
const tasks = require('./tasks');
const dashboard = require('./dashboard');
const team = require('./team');

router.use(homePage);
router.use(dashboard);
router.use(withAuth('manager', 'staff'), tasks);
router.use(withAuth('manager', 'staff'), team);

module.exports = router;
