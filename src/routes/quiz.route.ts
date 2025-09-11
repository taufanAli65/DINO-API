import { Router, Request, Response } from 'express';
import { asyncHandler } from '../utils/async_handler';
import { authenticate } from '../middlewares/authentication';
import { createQuizController, getQuizByIdController, listQuizzesByQuestionIdController } from '../controllers/quiz.controller';
import { authorize } from '../middlewares/authorization';
import { UserRole } from '../types/auth.types';

const router = Router();

router.post('/', authenticate, asyncHandler(createQuizController));
router.get('/:id', authenticate, authorize(UserRole.TEACHER), asyncHandler(getQuizByIdController));
router.get('/question/:questionId', authenticate, asyncHandler(listQuizzesByQuestionIdController));

export default router;