import { body, validationResult } from 'express-validator';
import Response from '../../utils/response.js';

const getProfile = [
    body('user_id')
        .notEmpty()
        .withMessage('user_id is required')
        .isInt({ min: 1 })
        .withMessage('user_id must be a positive integer'),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return Response.validation(res, errors.array());
        }

        next();
    },
];

const createUser = [
    body('user_type')
        .notEmpty()
        .withMessage('Type is required'),

    body('name')
        .notEmpty()
        .withMessage('Name is required'),

    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email'),

    body('mobile')
        .notEmpty()
        .withMessage('Mobile is required')
        .isMobilePhone('any')
        .withMessage('Invalid mobile number'),

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

const updateUser = [
    body('name')
        .notEmpty()
        .withMessage('Name is required'),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return Response.validation(res, errors.array());
        }

        next();
    },
];


const changePassword = [

    body('current_password')
        .notEmpty()
        .withMessage('Current Password is required'),

    body('new_password')
        .notEmpty()
        .withMessage('New Password is required'),

    body('confirm_password')
        .notEmpty()
        .withMessage('Confirm Password is required'),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return Response.validation(res, errors.array());
        }

        next();
    },
];

const userValidator = { getProfile, createUser, updateUser, changePassword };

export default userValidator;