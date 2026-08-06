import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import categoryServiceController from '../controllers/vendor/category-service.controller.js';
import categoryServiceValidator from '../validators/vendor/category-service.validator.js';
import { imageUpload } from "../middlewares/upload.middleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post('/create-category-service', imageUpload.single("service_banner_image"), categoryServiceValidator.createCategoryService, categoryServiceController.createCategoryService);
router.post('/get-category-service', categoryServiceController.getCategoryService);
router.post('/delete-category-service', categoryServiceController.deleteCategoryService);
router.post('/category-service-list', categoryServiceController.categoryServiceList);

export default router;
