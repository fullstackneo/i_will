const { getAll, getById, createOne, deleteOne, updateOne } = require('./../../controllers/post-controllers');
const withAuth = require('./../../utils/auth');
const router = require('express').Router();

// posts
router.route('/').all(withAuth('manager', 'staff'))
  .get(getAll)
  .post(createOne);

router.route('/:id').all(withAuth('manager', 'staff'))
  .get(getById)
  .put(updateOne)
  .delete(deleteOne);

module.exports = router;
