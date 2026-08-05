import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import userController from '../controllers/users/user.controller.js';
import userValidator from '../validators/users/user.validator.js';

const router = express.Router();

router.post('/create', userValidator.createUser, userController.createUser);

router.use(authMiddleware);

router.get('/', userController.getUsers);
router.post('/profile', userValidator.getProfile, userController.getProfile);
router.post('/update', userValidator.updateUser, userController.updateUser);
router.post('/change-password', userValidator.changePassword, userController.changePassword);
router.post('/delete', userController.userDelete);
router.post('/user-list', userController.userList);

export default router;