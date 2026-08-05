import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import categoryServiceController from '../controllers/vendor/category-service.controller.js';
import individualServiceValidator from '../validators/vendor/individual-service.validator.js';
import { imageUpload } from "../middlewares/upload.middleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post('/create-individual-service', imageUpload.single("service_banner_image"), individualServiceValidator.createIndividualService, categoryServiceController.createIndividualService);
router.post('/get-individual-service', categoryServiceController.getIndividualService);
router.post('/delete-individual-service', categoryServiceController.deleteIndividualService);
router.post('/individual-service-list', categoryServiceController.individualServiceList);

export default router;
