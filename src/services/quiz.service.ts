import { UUID } from "crypto";
import { createQuiz, getQuizById, getAllQuizzesByQuestionId, updateScorePlus } from "../repositories/quiz.repository";
import { AppError } from "../utils/app_error";

export const addQuiz = async(questionId: number, userId: UUID, score: number = 0) => {
  if (!questionId || !userId) {
    throw AppError("questionId and userId are required", 400);
  }
  return await createQuiz(questionId, userId, score);
}

export const getQuiz = async(id: number) => {
  const existingQuiz = await getQuizById(id);
  if (!existingQuiz) {
    throw AppError("Quiz not found", 404);
  }
  return existingQuiz;
}

export const listQuizzesByQuestionId = async (questionId: number, page: number = 1, pageSize: number = 10) => {
  return await getAllQuizzesByQuestionId(questionId, page, pageSize);
}

export const incrementScore = async(id: number, score: number) => {
  if (!id || score === undefined || score === null) {
    throw AppError("id and score are required", 400);
  }
  const updatedQuiz = await updateScorePlus(id, score);
  if (!updatedQuiz) {
    throw AppError("Quiz not found", 404);
  }
  return updatedQuiz;
}

