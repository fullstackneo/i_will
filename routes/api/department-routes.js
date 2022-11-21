const { getAll, getById, createOne, deleteOne, updateOne } = require('./../../controllers/department-controllers');
const withAuth = require('./../../utils/auth');
const router = require('express').Router();

// departments
router.route('/').all(withAuth('hr'))
  .get(getAll)
  .post(createOne);

router.route('/:id').all(withAuth('hr'))
  .get(getById)
  .put(updateOne)
  .delete(deleteOne);

module.exports = router;
