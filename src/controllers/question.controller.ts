import { addQuestion, editQuestion, removeQuestion, listQuestionsByCategoryService} from "../services/question.service";
import { Request, Response } from "express";
import { sendSuccess, sendFail } from "../utils/send_responses";
import { AppError } from "../utils/app_error";

export const createQuestionController = async (req: Request, res: Response) => {
  try {
    const { categoryId, text, optionA, optionB, optionC, optionD, correctOption } = req.body;
    if (!categoryId || !text || !optionA || !optionB || !optionC || !optionD || !correctOption) {
        throw AppError("All fields are required", 400);
    }
    const newQuestion = await addQuestion(categoryId, text, optionA, optionB, optionC, optionD, correctOption);
    const data = {
        id: newQuestion.id,
        categoryId: newQuestion.categoryId,
        text: newQuestion.text,
        optionA: newQuestion.optionA,
        optionB: newQuestion.optionB,
        optionC: newQuestion.optionC,
        optionD: newQuestion.optionD,
        correctOption: newQuestion.correctOption,
    }
    sendSuccess(res, 200, "Question created successfully", data);
  } catch (error) {
    sendFail(res, 500, "Failed to create Question", error);
  }
}

export const updateQuestionController = async (req: Request, res: Response) => {
  try {
    const questionId = parseInt(req.params.id);
    const { categoryId, text, optionA, optionB, optionC, optionD, correctOption } = req.body;
    if (!questionId) {
        throw AppError("Invalid Question ID", 400);
    }
    const updatedQuestion = await editQuestion(questionId, categoryId ?? null, text ?? null, optionA ?? null, optionB ?? null, optionC ?? null, optionD ?? null, correctOption ?? null);
    const data = {
        id: updatedQuestion?.id,
        categoryId: updatedQuestion?.categoryId,
        text: updatedQuestion?.text,
        optionA: updatedQuestion?.optionA,
        optionB: updatedQuestion?.optionB,
        optionC: updatedQuestion?.optionC,
        optionD: updatedQuestion?.optionD,
        correctOption: updatedQuestion?.correctOption,
    }
    sendSuccess(res, 200, "Question updated successfully", data);
  } catch (error) {
    sendFail(res, 500, "Failed to update Question", error);
  }
}

export const deleteQuestionController = async (req: Request, res: Response) => {
  try {
    const questionId = parseInt(req.params.id);
    if (!questionId) {
        throw AppError("Invalid Question ID", 400);
    }
    await removeQuestion(questionId);
    sendSuccess(res, 200, "Question deleted successfully");
  } catch (error) {
    sendFail(res, 500, "Failed to delete Question", error);
  }
}

export const listQuestionsByCategoryController = async (req: Request, res: Response) => {
  try {
    const categoryId = parseInt(req.params.categoryId);
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize as string) : 10;
    if (!categoryId) {
        throw AppError("Invalid Category ID", 400);
    }
    const questions = await listQuestionsByCategoryService(categoryId, page, pageSize);
    sendSuccess(res, 200, "Questions retrieved successfully", questions);
  } catch (error) {
    sendFail(res, 500, "Failed to retrieve Questions", error);
  }
}