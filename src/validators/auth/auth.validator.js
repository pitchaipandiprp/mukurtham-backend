import { body, validationResult } from 'express-validator';
import Response from '../../utils/response.js';

const login = [
    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email'),

    body('password')
        .notEmpty()
        .withMessage('Password is required'),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return Response.validation(res, errors.array());
        }

        next();
    },
];

const sendOtp = [
    body('mobile')
        .notEmpty()
        .withMessage('Mobile is required')
        .isMobilePhone('any')
        .withMessage('Invalid mobile number'),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return Response.validation(res, errors.array());
        }

        next();
    },
];

const verifyOtp = [
    body('mobile')
        .notEmpty()
        .withMessage('Mobile is required')
        .isMobilePhone('any')
        .withMessage('Invalid mobile number'),

    body('otp')
        .notEmpty()
        .withMessage('OTP is required')
        .isNumeric()
        .withMessage('OTP must be numeric')
        .isLength({ min: 6, max: 6 })
        .withMessage('OTP must be 6 digits'),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return Response.validation(res, errors.array());
        }

        next();
    },
];

const otpLogin = verifyOtp;

export { login, sendOtp, verifyOtp, otpLogin };