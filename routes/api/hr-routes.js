const resultC = require('./../../controllers/result-controllers');
const positionC = require('./../../controllers/position-controllers');
const levelC = require('./../../controllers/level-controllers');
const departmentC = require('./../../controllers/department-controllers');
const userC = require('./../../controllers/user-controllers');
const taskC = require('./../../controllers/task-controllers');

const router = require('express').Router();

// results
router.route('/results').get(resultC.getAll);

// positions
router.route('/positions').get(positionC.getAll);
router.route('/positions/:id').get(positionC.getById)
  .post(positionC.create)
  .put(positionC.update)
  .delete(positionC.delete);

// tasks
router.route('/tasks').get(taskC.getAll);
router.route('/tasks/:id').get(taskC.getById);

// users
router.route('/users').get(userC.getAll)
  .post(userC.create);
router.route('/users/:id').get(userC.getById)
  .put(userC.update)
  .delete(userC.delete);
router.route('/users/logout').post(userC.logout);

// levels
router.route('/levels').get(levelC.getAll)
  .post(levelC.create);
router.route('/levels/:id').get(levelC.getById)
  .put(levelC.update)
  .delete(levelC.delete);

// departments
router.route('/departments').get(departmentC.getAll)
  .post(departmentC.create);
router.route('/departments/:id').get(departmentC.getById)
  .put(departmentC.update)
  .delete(departmentC.delete);

module.exports = router;
