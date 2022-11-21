const { getAll, getById, createOne, deleteOne, updateOne } = require('./../../controllers/result-controllers');
const withAuth = require('./../../utils/auth');
const router = require('express').Router();

// results
router.route('/')
  .get(getAll)
  .post(withAuth('manager'), createOne);

router.route('/:id').all(withAuth('manager'))
  .delete(deleteOne)
  .put(updateOne)
  .get(getById);

module.exports = router;
