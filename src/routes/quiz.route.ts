import { Router } from 'express';
import { asyncHandler } from '../utils/async_handler';
import { authenticate } from '../middlewares/authentication';
import { createQuizController, getQuizByIdController, addStudentAnswerController, getStudentAnswersByQuizIdController } from '../controllers/quiz.controller';
import { authorize } from '../middlewares/authorization';
import { UserRole } from '../types/auth.types';

const router = Router();

router.post('/', authenticate, asyncHandler(createQuizController));
router.get('/:id', authenticate, asyncHandler(getQuizByIdController));
router.post('/:id/answer', authenticate, asyncHandler(addStudentAnswerController));
router.get('/:id/answers', authenticate, authorize(UserRole.TEACHER), asyncHandler(getStudentAnswersByQuizIdController));

export default router;