const router = require('express').Router();
const blogRoutes = require('./blogRoutes');
const userRoutes = require('./userRoutes');
const commentRoute = require('./commentRoute')

router.use('/blog_post', blogRoutes);
router.use('/users', userRoutes)
router.use('/commentRoute', commentRoute)

module.exports = router;