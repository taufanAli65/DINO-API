import { createQuestionCategory, updateQuestionCategory, deleteQuestionCategory, listQuestionCategoriesByCategory, bulkDeleteQuestionCategoriesByCategory, getQuestionCategoryById } from "../repositories/question_category.repository";
import { AppError } from "../utils/app_error";

export const addQuestionCategory = async(isKerajaan: boolean, kerajaanId?: number, tokohId?: number) => {
  if (isKerajaan && !kerajaanId) {
    throw AppError("kerajaanId is required when isKerajaan is true", 400);
  }
  if (!isKerajaan && !tokohId) {
    throw AppError("tokohId is required when isKerajaan is false", 400);
  }
  return await createQuestionCategory(isKerajaan, kerajaanId, tokohId);
}

export const editQuestionCategory = async(id: number, isKerajaan?: boolean | null, kerajaanId?: number | null, tokohId?: number | null) => {
  const existingCategory = await getQuestionCategoryById(id);
  if (!existingCategory) {
    throw AppError("Question Category not found", 404);
  }
  if (isKerajaan !== undefined && isKerajaan !== null) {
    if (isKerajaan && !kerajaanId) {
      throw AppError("kerajaanId is required when isKerajaan is true", 400);
    }
    if (!isKerajaan && !tokohId) {
      throw AppError("tokohId is required when isKerajaan is false", 400);
    }
  }
  return await updateQuestionCategory(id, isKerajaan, kerajaanId, tokohId);
}

export const removeQuestionCategory = async(id: number) => {
  const existingCategory = await getQuestionCategoryById(id);
  if (!existingCategory) {
    throw AppError("Question Category not found", 404);
  }
  return await deleteQuestionCategory(id); 
}

export const listCategoriesByType = async (isKerajaan: boolean, page: number = 1, pageSize: number = 10) => {
  return await listQuestionCategoriesByCategory(isKerajaan, page, pageSize);
}

export const bulkRemoveCategoriesByType = async (isKerajaan: boolean) => {
  return await bulkDeleteQuestionCategoriesByCategory(isKerajaan);
}