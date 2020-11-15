const express = require('express');
const userRoutes = require('./user.route');
const CategoryRoutes = require('./category.router');
const ProductRoutes = require('./product.route');
const authRoutes = require('./auth.route');

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * GET v1/docs
 */
router.use('/docs', express.static('docs'));

router.use('/users', userRoutes);
router.use('/categoryRoutes', CategoryRoutes);
router.use('/ProductRoutes', ProductRoutes)
router.use('/auth', authRoutes);

module.exports = router;
