const { getAll, getById, createOne, deleteOne, updateOne } = require('./../../controllers/task-controllers');
const withAuth = require('./../../utils/auth');
const router = require('express').Router();

// tasks
router.route('/')
  .get(withAuth('manager', 'staff'), getAll)
  .post(withAuth('manager'), createOne);

router.route('/:id')
  .delete(withAuth('manager'), deleteOne)
  .put(withAuth('manager', 'staff'), updateOne)
  .get(getById);

module.exports = router;
