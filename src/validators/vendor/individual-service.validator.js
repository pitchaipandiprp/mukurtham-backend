import { body, validationResult } from 'express-validator';
import Response from '../../utils/response.js';

const createIndividualService = [
    body('category_id')
        .notEmpty()
        .withMessage('category_id is required')
        .isInt({ min: 1 })
        .withMessage('category_id must be a positive integer'),


    body('state_id')
        .notEmpty()
        .withMessage('state_id is required')
        .isInt({ min: 1 })
        .withMessage('state_id must be a positive integer'),

    body('city_id')
        .notEmpty()
        .withMessage('city_id is required')
        .isInt({ min: 1 })
        .withMessage('city_id must be a positive integer'),

    body('locality_id')
        .notEmpty()
        .withMessage('locality_id is required')
        .isInt({ min: 1 })
        .withMessage('locality_id must be a positive integer'),

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

    body('tax')
        .optional({ values: 'falsy' })
        .isFloat({ min: 0 })
        .withMessage('tax must be 0 or greater'),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return Response.validation(res, errors.array());
        }

        next();
    },
];

const individualServiceValidator = {
    createIndividualService,
};

export default individualServiceValidator;
