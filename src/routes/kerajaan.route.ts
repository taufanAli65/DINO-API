import { Router, Request, Response } from 'express';
import { asyncHandler } from '../utils/async_handler';
import { authenticate } from '../middlewares/authentication';
import { createKerajaanController, updateKerajaanController, deleteKerajaanController, getAllKerajaanController, getKerajaanByIdController } from '../controllers/kerajaan.controller';
import { authorize } from '../middlewares/authorization';
import { UserRole } from '../types/auth.types';
import { upload } from '../middlewares/upload';


const router = Router();

router.get('/', authenticate, asyncHandler(getAllKerajaanController));
router.get('/:id', authenticate, asyncHandler(getKerajaanByIdController));
router.post('/', authenticate, authorize(UserRole.TEACHER), upload.single('photo'), asyncHandler(createKerajaanController));
router.put('/:id', authenticate, authorize(UserRole.TEACHER), upload.single('photo'), asyncHandler(updateKerajaanController));
router.delete('/:id', authenticate, authorize(UserRole.TEACHER), asyncHandler(deleteKerajaanController));

export default router;