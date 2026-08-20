import { body, validationResult } from 'express-validator';
import Response from '../../utils/response.js';

const createCategoryService = [
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

    body('service_name')
        .notEmpty()
        .withMessage('service_name is required'),

    body('amount')
        .notEmpty()
        .optional({ values: 'falsy' })
        .isFloat({ min: 0 })
        .withMessage('amount must be 0 or greater'),

    body('discount')
        .optional({ values: 'falsy' })
        .isFloat({ min: 0 })
        .withMessage('discount must be 0 or greater'),

    body('tax_percentage')
        .optional({ values: 'falsy' })
        .isFloat({ min: 0 })
        .withMessage('tax_percentage must be 0 or greater'),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return Response.validation(res, errors.array());
        }

        next();
    },
];

const categoryServiceValidator = {
    createCategoryService,
};

export default categoryServiceValidator;
