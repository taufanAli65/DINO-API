import { addQuiz, getQuiz, listQuizzesByQuestionId } from "../services/quiz.service";
import { Request, Response } from "express";
import { sendSuccess, sendFail } from "../utils/send_responses";
import { AppError } from "../utils/app_error";

export const createQuizController = async (req: Request, res: Response) => {
  try {
    const { questionId, userId, score } = req.body;
    if (!questionId || !userId) {
        throw AppError("questionId and userId are required", 400);
    }
    const newQuiz = await addQuiz(questionId, userId, score ?? 0);
    const data = {
        id: newQuiz.id,
        questionId: newQuiz.questionId,
        userId: newQuiz.userId,
        score: newQuiz.score,
    }
    sendSuccess(res, 200, "Quiz created successfully", data);
  } catch (error) {
    sendFail(res, 500, "Failed to create Quiz", error);
  }
}

export const getQuizByIdController = async (req: Request, res: Response) => {
  try {
    const quizId = parseInt(req.params.id);
    if (!quizId) {
        throw AppError("Invalid Quiz ID", 400);
    }
    const quiz = await getQuiz(quizId);
    const data = {
        id: quiz.id,
        questionId: quiz.questionId,
        userId: quiz.userId,
        score: quiz.score,
    }
    sendSuccess(res, 200, "Quiz retrieved successfully", data);
  } catch (error) {
    sendFail(res, 500, "Failed to retrieve Quiz", error);
  }
}

export const listQuizzesByQuestionIdController = async (req: Request, res: Response) => {
  try {
    const questionId = parseInt(req.params.questionId);
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    if (!questionId) {
        throw AppError("Invalid Question ID", 400);
    }
    const quizzes = await listQuizzesByQuestionId(questionId, page, pageSize);
    if (quizzes === null) {
        throw AppError("No quizzes found for the given Question ID", 404);
    }
    const data = quizzes.map(quiz => ({
        id: quiz.id,
        questionId: quiz.questionId,
        userId: quiz.userId,
        score: quiz.score,
    }));
    sendSuccess(res, 200, "Quizzes retrieved successfully", data);
  } catch (error) {
    sendFail(res, 500, "Failed to retrieve Quizzes", error);
  }
}
