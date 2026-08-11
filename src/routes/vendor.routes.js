import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import categoryServiceController from '../controllers/vendor/category-service.controller.js';
import categoryServiceValidator from '../validators/vendor/category-service.validator.js';
import galleryController from '../controllers/vendor/gallery.controller.js';
import galleryValidator from '../validators/vendor/gallery.validator.js';
import { upload } from "../middlewares/upload.middleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post(
    '/create-category-service',
    upload({
        folder: "services",
        type: "image",
        maxSize: 5,
    }).single("service_banner_image"),
    categoryServiceValidator.createCategoryService,
    categoryServiceController.createCategoryService
);
router.post('/get-category-service', categoryServiceController.getCategoryService);
router.post('/update-category-service-status', categoryServiceController.updateCategoryServiceStatus);
router.post('/category-service-list', categoryServiceController.categoryServiceList);
router.post('/category-service-records', categoryServiceController.categoryServiceRecords);


router.post(
    '/create-gallery',
    upload({
        folder: "gallery",
        type: "image",
        maxSize: 5,
    }).single("gallery_image"),
    galleryValidator.createGallery,
    galleryController.createGallery
);
router.post('/get-gallery', galleryController.getGallery);
router.post('/update-gallery-status', galleryController.updateGalleryStatus);
router.post('/gallery-list', galleryController.galleryList);


export default router;
