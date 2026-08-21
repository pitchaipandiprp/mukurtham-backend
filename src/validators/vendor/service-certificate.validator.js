import { body, validationResult } from 'express-validator';
import Response from '../../utils/response.js';

const createServiceCertificate = [
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

    body('aadhar_number')
        .notEmpty()
        .withMessage('aadhar_number is required'),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return Response.validation(res, errors.array());
        }

        next();
    },
];
const serviceCertificateValidator = {
    createServiceCertificate,
};

export default serviceCertificateValidator;
