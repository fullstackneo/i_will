const { getAll, getById, createOne, deleteOne, updateOne } = require('./../../controllers/level-controllers');
const withAuth = require('./../../utils/auth');
const router = require('express').Router();

// levels
router.route('/').all(withAuth('hr'))
  .get(getAll)
  .post(createOne);

router.route('/:id').all(withAuth('hr'))
  .get(getById)
  .put(updateOne)
  .delete(deleteOne);

module.exports = router;
