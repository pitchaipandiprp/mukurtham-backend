import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import serviceDateController from '../controllers/admin/service-date.controller.js';
import serviceDateValidator from '../validators/admin/service-date.validator.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/create-service-date', serviceDateValidator.createServiceDate, serviceDateController.createServiceDate);
router.post('/get-service-date', serviceDateController.getServiceDate);
router.post('/update-service-date-status', serviceDateController.updateServiceDateStatus);
router.post('/service-date-list', serviceDateController.serviceDateList);
router.post('/service-date-records', serviceDateController.serviceDateRecords);


export default router;