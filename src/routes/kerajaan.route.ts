import { Router, Request, Response } from 'express';
import { asyncHandler } from '../utils/async_handler';
import { authenticate } from '../middlewares/authentication';
import { createKerajaanController, updateKerajaanController, deleteKerajaanController, getAllKerajaanController, getKerajaanByIdController } from '../controllers/kerajaan.controller';
import { authorize } from '../middlewares/authorization';
import { UserRole } from '../types/auth_types';


const router = Router();

router.get('/', authenticate, asyncHandler(getAllKerajaanController));
router.get('/:id', authenticate, asyncHandler(getKerajaanByIdController));
router.post('/', authenticate, authorize(UserRole.TEACHER), asyncHandler(createKerajaanController));
router.put('/:id', authenticate, authorize(UserRole.TEACHER), asyncHandler(updateKerajaanController));
router.delete('/:id', authenticate, authorize(UserRole.TEACHER), asyncHandler(deleteKerajaanController));

export default router;