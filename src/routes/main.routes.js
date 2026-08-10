import express from 'express';
import categoriesController from '../controllers/main/categories.controller.js';

const router = express.Router();

router.post('/category-service-search', categoriesController.categoryServiceSearch);
router.post('/get-category-service', categoriesController.getCategoryService);

export default router;