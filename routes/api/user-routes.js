const { getAll, getById, createOne, deleteOne, updateOne, login, logout } = require('./../../controllers/user-controllers');
const withAuth = require('./../../utils/auth');
const router = require('express').Router();

// users
router.route('/')
  .get(withAuth('hr', 'manager'), getAll)
  .post(createOne);

router.route('/:id')
  .get(getById)
  .put(updateOne)
  .delete(deleteOne);

router.route('/login')
  .post(login);

router.route('/logout')
  .post(logout);

module.exports = router;
