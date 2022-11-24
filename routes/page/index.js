const router = require('express').Router();
const withAuth = require('./../../utils/auth');
const homePage = require('./homepage');
const tasks = require('./tasks');
const dashboard = require('./profile');
const team = require('./team');
const projects = require('./projects');

router.use(homePage);
router.use(dashboard);
router.use('/projects', withAuth('manager'), projects);
router.use('/tasks', withAuth('manager', 'staff'), tasks);
router.use(withAuth('manager', 'staff'), team);

module.exports = router;
