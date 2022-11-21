const router = require('express').Router();
const touristRoutes = require('./tourist-routes');
const withAuth = require('./../../utils/auth');
const hrRoutes = require('./hr-routes');
const managerRoutes = require('./manager-routes');
const staffRoutes = require('./staff-routes');

router.use(touristRoutes);
// router.use(withAuth('hr'), hrRoutes);
// router.use(withAuth('manager'), managerRoutes);
// router.use(withAuth('staff'), staffRoutes);

module.exports = router;
