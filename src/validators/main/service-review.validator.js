import { body, validationResult } from 'express-validator';
import Response from '../../utils/response.js';

const createServiceReview = [
    body('user_id')
        .notEmpty()
        .withMessage('user_id is required')
        .isInt({ min: 1 })
        .withMessage('user_id must be a positive integer'),

    body('category_service_id')
        .notEmpty()
        .withMessage('category_service_id is required')
        .isInt({ min: 1 })
        .withMessage('category_service_id must be a positive integer'),

    body('rating')
        .optional({ values: 'falsy' })
        .isInt({ min: 1, max: 5 })
        .withMessage('rating must be an integer between 1 and 5'),


    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return Response.validation(res, errors.array());
        }

        next();
    },
];

const serviceReviewValidator = {
    createServiceReview,
};

export default serviceReviewValidator;
