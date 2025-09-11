import { createQuestion,  getQuestionById, updateQuestion, deleteQuestion, listQuestionsByCategory, getCorrectOption} from "../repositories/question.repository";
import { AppError } from "../utils/app_error";

export const addQuestion = async(categoryId: number, text: string, optionA: string, optionB: string, optionC: string, optionD: string, correctOption: string) => {
  if (!categoryId || !text || !optionA || !optionB || !optionC || !optionD || !correctOption) {
    throw AppError("All fields are required", 400);
  }
  return await createQuestion(categoryId, text, optionA, optionB, optionC, optionD, correctOption);
}

export const editQuestion = async(id: number, categoryId?: number | null, text?: string | null, optionA?: string | null, optionB?: string | null, optionC?: string | null, optionD?: string | null, correctOption?: string | null) => {
  const existingQuestion = await getQuestionById(id);
  if (!existingQuestion) {
    throw AppError("Question not found", 404);
  }
  return await updateQuestion(id, categoryId, text, optionA, optionB, optionC, optionD, correctOption);
}

export const removeQuestion = async(id: number) => {
  const existingQuestion = await getQuestionById(id);
  if (!existingQuestion) {
    throw AppError("Question not found", 404);
  }
  return await deleteQuestion(id); 
}

export const listQuestionsByCategoryService = async (categoryId: number, page: number = 1, pageSize: number = 10) => {
  return await listQuestionsByCategory(categoryId, page, pageSize);
}

export const getCorrectAnswer = async(questionId: number) => {
  const existingQuestion = await getQuestionById(questionId);
  if (!existingQuestion) {
    throw AppError("Question not found", 404);
  }
  return await getCorrectOption(questionId);
}