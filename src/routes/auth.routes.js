import express from 'express';
import authController from '../controllers/auth/auth.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

import {
    login as loginValidator,
    sendOtp as sendOtpValidator,
    verifyOtp as verifyOtpValidator,
    otpLogin as otpLoginValidator,
} from '../validators/auth/auth.validator.js';

const router = express.Router();

router.post('/login', loginValidator, authController.login);
router.post('/send-otp', sendOtpValidator, authController.sendOtp);
router.post('/verify-otp', verifyOtpValidator, authController.verifyOtp);
router.post('/otp-login', otpLoginValidator, authController.otpLogin);
router.post('/refresh-token', authController.refreshToken);
// router.post('/forgot-password', authController.forgotPassword);
router.post('/logout', authController.logout);

export default router;