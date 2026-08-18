import { body, validationResult } from 'express-validator';
import Response from '../../utils/response.js';

const createGallery = [
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

    body('gallery_type')
        .optional({ values: 'falsy' })
        .isString()
        .withMessage('gallery_type must be a string'),


    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return Response.validation(res, errors.array());
        }

        next();
    },
];

const galleryValidator = {
    createGallery,
};

export default galleryValidator;
