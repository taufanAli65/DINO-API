import { addQuestionCategory, editQuestionCategory, removeQuestionCategory, listCategoriesByType, bulkRemoveCategoriesByType } from "../services/question_category.service";
import { Request, Response } from "express";
import { sendSuccess, sendFail } from "../utils/send_responses";
import { AppError } from "../utils/app_error";

export const createQuestionCategoryController = async (req: Request, res: Response) => {
  try {
    const { isKerajaan, kerajaanId, tokohId } = req.body;
    if (isKerajaan === undefined || isKerajaan === null) {
        throw AppError("isKerajaan is required", 400);
    }
    const newCategory = await addQuestionCategory(isKerajaan, kerajaanId, tokohId);
    const data = {
        id: newCategory.id,
        isKerajaan: newCategory.isKerajaan,
        kerajaanId: newCategory.kerajaanId,
        tokohId: newCategory.tokohId,
    }
    sendSuccess(res, 200, "Question Category created successfully", data);
  } catch (error) {
    sendFail(res, 500, "Failed to create Question Category", error);
  }
}

export const updateQuestionCategoryController = async (req: Request, res: Response) => {
  try {
    const categoryId = parseInt(req.params.id);
    const { isKerajaan, kerajaanId, tokohId } = req.body;
    if (!categoryId) {
        throw AppError("Invalid Category ID", 400);
    }
    const updatedCategory = await editQuestionCategory(categoryId, isKerajaan, kerajaanId, tokohId);
    const data = {
        id: updatedCategory?.id,
        isKerajaan: updatedCategory?.isKerajaan,
        kerajaanId: updatedCategory?.kerajaanId,
        tokohId: updatedCategory?.tokohId,
    }
    sendSuccess(res, 200, "Question Category updated successfully", data);
  } catch (error) {
    sendFail(res, 500, "Failed to update Question Category", error);
  }
}

export const deleteQuestionCategoryController = async (req: Request, res: Response) => {
  try {
    const categoryId = parseInt(req.params.id);
    if (!categoryId) {
        throw AppError("Invalid Category ID", 400);
    }
    await removeQuestionCategory(categoryId);
    sendSuccess(res, 200, "Question Category deleted successfully");
  } catch (error) {
    sendFail(res, 500, "Failed to delete Question Category", error);
  }
}

export const listQuestionCategoriesController = async (req: Request, res: Response) => {
  try {
    const isKerajaan = req.query.isKerajaan === 'true';
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize as string) : 10;

    const categories = await listCategoriesByType(isKerajaan, page, pageSize);
    sendSuccess(res, 200, "Question Categories retrieved successfully", categories);
  } catch (error) {
    sendFail(res, 500, "Failed to retrieve Question Categories", error);
  }
}

export const bulkDeleteQuestionCategoriesController = async (req: Request, res: Response) => {
  try {
    const isKerajaan = req.query.isKerajaan === 'true';
    await bulkRemoveCategoriesByType(isKerajaan);
    sendSuccess(res, 200, "Question Categories deleted successfully");
  } catch (error) {
    sendFail(res, 500, "Failed to delete Question Categories", error);
  }
}