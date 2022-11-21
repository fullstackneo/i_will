const router = require('express').Router();
const commentRoutes = require('./comment-routes');
const departmentRoutes = require('./department-routes');
const levelRoutes = require('./level-routes');
const positionRoutes = require('./position-routes');
const postRoutes = require('./post-routes');
const projectRoutes = require('./project-routes');
const resultRoutes = require('./comment-routes');
const taskRoutes = require('./task-routes');
const userRoutes = require('./user-routes');

router.use('/comments', commentRoutes);
router.use('/departments', departmentRoutes);
router.use('/levels', levelRoutes);
router.use('/positions', positionRoutes);
router.use('/posts', postRoutes);
router.use('/projects', projectRoutes);
router.use('/results', resultRoutes);
router.use('/tasks', taskRoutes);
router.use('/users', userRoutes);

module.exports = router;
