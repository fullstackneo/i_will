const userC = require('./../../controllers/user');

const router = require('express').Router();

router.route('/users/login').post(userC.login);

module.exports = router;
