const taskC = require('./../../controllers/task-controllers');
const resultC = require('./../../controllers/result-controllers');
const userC = require('./../../controllers/user-controllers');
const projectC = require('./../../controllers/project-controllers');

const router = require('express').Router();

// projects
router.route('/projects').get(projectC.getAll);

// results
router.route('/results').get(resultC.getAll);
router.route('/results/:id')
  .post(resultC.create)
  .delete(resultC.delete)
  .put(resultC.update)
  .get(resultC.getById);

// tasks
router.route('/tasks').get(taskC.getAll);
router.route('/tasks/:id').post(taskC.create)
  .delete(taskC.delete)
  .put(taskC.update)
  .get(taskC.getById);

// users
router.route('/users').get(userC.getAll);
router.route('/users/:id').get(userC.getById)
  .put(userC.update)
  .delete(userC.delete);
router.route('/users/logout').post(userC.logout);

module.exports = router;
