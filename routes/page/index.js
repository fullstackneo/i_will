const router = require('express').Router();
const homePage = require('./homepage');
router.use(homePage);
module.exports = router;
