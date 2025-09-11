import { UUID } from "crypto";
import { createQuiz, getQuizById, updateScorePlus, updateScoreMinus } from "../repositories/quiz.repository";
import { AppError } from "../utils/app_error";

export const addQuiz = async(userId: UUID, score: number = 0) => {
  if (!userId) {
    throw AppError("userId is required", 400);
  }
  return await createQuiz(userId, score);
}

export const getQuiz = async(id: number) => {
  const existingQuiz = await getQuizById(id);
  if (!existingQuiz) {
    throw AppError("Quiz not found", 404);
  }
  return existingQuiz;
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

export const decrementScore = async(id: number, score: number) => {
  if (!id || score === undefined || score === null) {
    throw AppError("id and score are required", 400);
  }
  const updatedQuiz = await updateScoreMinus(id, score);
  if (!updatedQuiz) {
    throw AppError("Quiz not found", 404);
  }
  return updatedQuiz;
}
