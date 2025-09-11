import { addQuiz, getQuiz } from "../services/quiz.service";
import { addStudentAnswer, getStudentAnswerServiceByQuizId } from "../services/student_answer.service";
import { Request, Response } from "express";
import { sendSuccess, sendFail } from "../utils/send_responses";
import { AppError } from "../utils/app_error";

export const createQuizController = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
        throw AppError("User not authenticated", 401);
    }
    const { quizId} = req.body;
    if (!quizId) {
        throw AppError("quizId is required", 400);
    }
    const newQuiz = await addQuiz(userId as `${string}-${string}-${string}-${string}-${string}`); // Copilot generated, aku mumet
    const data = {
        id: newQuiz.id,
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
    const { questionId, selectedOption } = req.body;
    if (!questionId || !selectedOption || !userId) {
        throw AppError("All fields are required", 400);
    }
    const newAnswer = await addStudentAnswer(questionId, quizId, userId as `${string}-${string}-${string}-${string}-${string}`, selectedOption); // Copilot generated, aku mumet
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