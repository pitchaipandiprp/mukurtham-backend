import express from 'express';
import categoriesController from '../controllers/main/categories.controller.js';
import galleryController from '../controllers/main/gallery.controller.js';
import serviceReviewController from '../controllers/main/service-review.controller.js';
import serviceReviewValidator from '../validators/main/service-review.validator.js';

const router = express.Router();

router.post('/category-service-search', categoriesController.categoryServiceSearch);
router.post('/get-category-service', categoriesController.getCategoryService);
router.post('/gallery-records', galleryController.galleryRecords);

router.post('/create-service-review', serviceReviewValidator.createServiceReview, serviceReviewController.createServiceReview);
router.post('/service-review-list', serviceReviewController.serviceReviewList);
router.post('/service-review-records', serviceReviewController.serviceReviewRecords);

export default router;