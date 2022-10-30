const router = require('express').Router();
const apiRoutes = require('./api');
const pageRoutes = require('./page');

router.use('/api', apiRoutes);
router.use(pageRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
