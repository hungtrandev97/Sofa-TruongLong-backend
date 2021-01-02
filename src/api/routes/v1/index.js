const express = require('express');
const CategoryRoutes = require('./category.router');
const ProductRoutes = require('./product.route');
const authRoutes = require('./auth.route');
const SettingRoutes = require('./setting.route');
const cartRoutes = require('./cart.route');
const ContactRoutes = require('./contact.route');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('sever is up and running')
})
/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * GET v1/docs
 */
router.use('/docs', express.static('docs'));

router.use('/categoryRoutes', CategoryRoutes);
router.use('/ProductRoutes', ProductRoutes);
router.use('/auth', authRoutes);
router.use('/SettingRoutes', SettingRoutes);
router.use('/contactRoutes', ContactRoutes);
router.use('/cartRoutes', cartRoutes);

module.exports = router;
