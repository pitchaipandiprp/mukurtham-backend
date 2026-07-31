import express from 'express';
import commonController from '../controllers/common/common.controller.js';

const router = express.Router();

router.get('/categories', commonController.getCategories);

export default router;