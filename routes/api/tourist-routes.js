const resultC = require('./../../controllers/result-controllers');
const userC = require('./../../controllers/user-controllers');

const router = require('express').Router();

router.route('/users').post(resultC.create);

router.delete('/user/:id').delete(resultC.delete);
router.route('/users/login').post(userC.login);

module.exports = router;
