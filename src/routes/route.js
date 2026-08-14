import express from 'express';
import commonRoutes from './common.routes.js';
import mainRoutes from './main.routes.js';
import authRoutes from './auth.routes.js';
import userRoutes from './user.routes.js';
import adminRoutes from './admin.routes.js';
import vendorRoutes from './vendor.routes.js';
import customerRoutes from './customer.routes.js';

const router = express.Router();

router.use('/', commonRoutes);
router.use('/', mainRoutes);
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/admin', adminRoutes);
router.use('/vendors', vendorRoutes);
router.use('/customers', customerRoutes);

export default router;