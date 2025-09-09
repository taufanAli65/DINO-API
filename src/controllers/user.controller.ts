import { deleteUser } from "../services/user.service";
import { Request, Response } from "express";
import { sendSuccess } from "../utils/send_responses";
import { AppError } from "../utils/app_error";

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    await deleteUser(userId);
    sendSuccess(res, 200, "User deleted successfully");
  } catch (error) {
    return AppError("Error deleting user", 500, error);
  }
}