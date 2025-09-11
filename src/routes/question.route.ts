import { Router } from 'express';
import { asyncHandler } from '../utils/async_handler';
import { authenticate } from '../middlewares/authentication';
import { createQuestionController, updateQuestionController, deleteQuestionController, listQuestionsByCategoryController } from '../controllers/question.controller';
import { authorize } from '../middlewares/authorization';
import { UserRole } from '../types/auth.types';

const router = Router();

router.post('/', authenticate, authorize(UserRole.TEACHER), asyncHandler(createQuestionController));
router.put('/:id', authenticate, authorize(UserRole.TEACHER), asyncHandler(updateQuestionController));
router.delete('/:id', authenticate, authorize(UserRole.TEACHER), asyncHandler(deleteQuestionController));
router.get('/category/:categoryId', authenticate, asyncHandler(listQuestionsByCategoryController));

export default router;