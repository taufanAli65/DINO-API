import { Request, Response } from "express";
import { isEmailTaken, registerStudent, registerTeacher } from "../services/user.service";
import { login } from "../services/auth.service";
import { RegisterRequest, LoginRequest } from "../types/auth.types";
import { AppError } from "../utils/app_error";
import { sendFail, sendSuccess } from "../utils/send_responses";

export const registerStudentController = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body as RegisterRequest;
    const isTaken = await isEmailTaken(email);
    if (isTaken) {
      return sendFail(res, 400, "Email is already taken");
    }
    const data = await registerStudent(name, email, password);
    const user = { name: data.name, email: data.email, role: data.role };
    sendSuccess(res, 201, "Student registered successfully", user);
  } catch (error) {
    return AppError("Error registering student", 500, error);
  }
}

export const registerTeacherController = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body as RegisterRequest;
    const isTaken = await isEmailTaken(email);
    if (isTaken) {
      return sendFail(res, 400, "Email is already taken");
    }
    const data = await registerTeacher(name, email, password);
    const user = { name: data.name, email: data.email, role: data.role };
    sendSuccess(res, 201, "Teacher registered successfully", user);
  } catch (error) {
    return AppError("Error registering teacher", 500, error);
  }
}

export const loginController = async(req: Request, res: Response) => {
  try {
    const { email, password } = req.body as LoginRequest;
    const token = await login(email, password);
    sendSuccess(res, 200, "Login successful", { token });
  } catch (error) {
    return AppError("Error logging in", 500, error);
  }
}