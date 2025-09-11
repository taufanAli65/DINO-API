import { Router } from 'express';
import { asyncHandler } from '../utils/async_handler';
import { authenticate } from '../middlewares/authentication';
import { createQuestionCategoryController, updateQuestionCategoryController, deleteQuestionCategoryController, listQuestionCategoriesController, bulkDeleteQuestionCategoriesController } from '../controllers/question_category.controller';
import { authorize } from '../middlewares/authorization';
import { UserRole } from '../types/auth.types';

const router = Router();

router.post('/', authenticate, authorize(UserRole.TEACHER), asyncHandler(createQuestionCategoryController));
router.put('/:id', authenticate, authorize(UserRole.TEACHER), asyncHandler(updateQuestionCategoryController));
router.delete('/:id', authenticate, authorize(UserRole.TEACHER), asyncHandler(deleteQuestionCategoryController));
router.get('/', authenticate, asyncHandler(listQuestionCategoriesController));
router.delete('/', authenticate, authorize(UserRole.TEACHER), asyncHandler(bulkDeleteQuestionCategoriesController));

export default router;
