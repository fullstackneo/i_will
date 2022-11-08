const resultC = require('./../../controllers/result-controllers');
const taskC = require('./../../controllers/task-controllers');
const userC = require('./../../controllers/user-controllers');

const router = require('express').Router();

// results
router.route('/results')
  .get(resultC.getAll);

// tasks
router.route('/tasks').get(taskC.getAll);
router.route('/tasks/:id').put(taskC.update)
  .get(taskC.getById);

// users
router.route('/users/:id').get(userC.getById)
  .put(userC.update);
module.exports = router;
