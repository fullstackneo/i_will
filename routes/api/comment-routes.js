const { getAll, getById, createOne, deleteOne, updateOne } = require('./../../controllers/comment-controllers');
const withAuth = require('./../../utils/auth');
const router = require('express').Router();

// comment
router.route('/').all(withAuth('manager', 'staff'))
  .get(getAll)
  .post(createOne);

router.route('/:id').all(withAuth('manager', 'staff'))
  .delete(deleteOne)
  .put(updateOne)
  .get(getById);

module.exports = router;
