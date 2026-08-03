import express from 'express';
import authRoutes from './auth.routes.js';
import userRoutes from './user.routes.js';
import commonRoutes from './common.routes.js';
import vendorRoutes from './vendor.routes.js';

const router = express.Router();

router.use('/', commonRoutes);
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/vendors', vendorRoutes);

export default router;