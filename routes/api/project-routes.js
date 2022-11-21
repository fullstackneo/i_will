const { getAll, getById, createOne, deleteOne, updateOne } = require('./../../controllers/project-controllers');
const withAuth = require('./../../utils/auth');
const router = require('express').Router();

// projects
router.route('/').all(withAuth('manager'))
  .get(getAll)
  .post(createOne);

router.route('/:id').all(withAuth('manager'))
  .delete(deleteOne)
  .put(updateOne)
  .get(getById);

module.exports = router;
