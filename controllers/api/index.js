const router = require('express').Router();
const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');
const taskRoutes = require('./task-routes');
const commentRoutes = require('./comment-routes');
const positionRoutes = require('./position-routes');
const departmentRoutes = require('./department-routes.js');
const resultRoutes = require('./result-routes');
const levelRoutes = require('./level-routes');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/tasks', taskRoutes);
router.use('/comments', commentRoutes);
router.use('/positions', positionRoutes);
router.use('/departments', departmentRoutes);
router.use('/results', resultRoutes);
router.use('/levels', levelRoutes);
module.exports = router;
