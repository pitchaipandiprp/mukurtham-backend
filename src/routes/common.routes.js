import express from 'express';
import commonController from '../controllers/common/common.controller.js';

const router = express.Router();

router.post('/categories', commonController.getCategories);
router.post('/facilities', commonController.getFacilities);
router.post('/cities', commonController.getCities);
router.post('/localities', commonController.getLocalities);

export default router;