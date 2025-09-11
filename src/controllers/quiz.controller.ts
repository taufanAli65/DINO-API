import { addQuiz, getQuiz, listQuizzesByQuestionId } from "../services/quiz.service";
import { addStudentAnswer, getStudentAnswerServiceByQuizId } from "../services/student_answer.service";
import { Request, Response } from "express";
import { sendSuccess, sendFail } from "../utils/send_responses";
import { AppError } from "../utils/app_error";

export const createQuizController = async (req: Request, res: Response) => {
  try {
    const { questionId, userId, score } = req.body;
    if (!questionId || !userId) {
        throw AppError("questionId and userId are required", 400);
    }
    const existingQuestion = await listQuizzesByQuestionId(questionId);
    if (existingQuestion && existingQuestion.length >= 10) {
        throw AppError("Cannot create more than 10 quizzes for the same question", 400);
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

export const addStudentAnswerController = async (req: Request, res: Response) => {
  try {
    const quizId = parseInt(req.params.quizId);
    const userId = req.user?.id;
    const { selectedOption } = req.body;
    if (!userId || !selectedOption) {
        throw AppError("All fields are required", 400);
    }
    const newAnswer = await addStudentAnswer(quizId, userId, selectedOption);
    const data = {
        student_answer: newAnswer.student_answer,
        correct_answer: newAnswer.correct_answer,
        correct: newAnswer.correct,
    }
    sendSuccess(res, 200, "Student answer added successfully", data);
  } catch (error) {
    sendFail(res, 500, "Failed to add Student answer", error);
  }
}

export const getStudentAnswersByQuizIdController = async (req: Request, res: Response) => {
  try {
    const quizId = parseInt(req.params.quizId);
    if (!quizId) {
        throw AppError("Invalid Quiz ID", 400);
    }
    const answers = await getStudentAnswerServiceByQuizId(quizId);
    sendSuccess(res, 200, "Student answers retrieved successfully", answers);
  } catch (error) {
    sendFail(res, 500, "Failed to retrieve Student answers", error);
  }
}