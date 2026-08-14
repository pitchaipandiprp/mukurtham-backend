import { body, validationResult } from 'express-validator';
import Response from '../../utils/response.js';

const createServiceDate = [
    body('user_id')
        .notEmpty()
        .withMessage('user_id is required')
        .isInt({ min: 1 })
        .withMessage('user_id must be a positive integer'),

    body('category_id')
        .notEmpty()
        .withMessage('category_id is required')
        .isInt({ min: 1 })
        .withMessage('category_id must be a positive integer'),

    body('date_type')
        .optional({ values: 'falsy' })
        .isString()
        .withMessage('date_type must be a string')
        .isLength({ max: 50 })
        .withMessage('date_type must not exceed 50 characters'),

    body('service_date')
        .optional({ values: 'falsy' })
        .matches(/^\d{4}-\d{2}-\d{2}$/)
        .withMessage('service_date must be in YYYY-MM-DD format')
        .custom((value) => {
            const date = new Date(`${value}T00:00:00.000Z`);
            if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value) {
                throw new Error('service_date must be a valid date');
            }
            return true;
        }),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return Response.validation(res, errors.array());
        }

        next();
    },
];

export default { createServiceDate };