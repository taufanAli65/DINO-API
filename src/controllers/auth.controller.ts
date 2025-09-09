import { Request, Response } from "express";
import { isEmailTaken, registerStudent, registerTeacher } from "../services/user.service";
import { login } from "../services/auth.service";
import { RegisterRequest, LoginRequest } from "../types/auth_types";

export const registerStudentController = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body as RegisterRequest;
    const isTaken = await isEmailTaken(email);
    if (isTaken) {
      return res.status(400).json({ message: "Email is already taken" });
    }
    const data = await registerStudent(name, email, password);
    const user = { name: data.name, email: data.email, role: data.role };
    res.status(201).json({ message: "Student registered successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error registering student", error });
  }
}

export const registerTeacherController = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body as RegisterRequest;
    const isTaken = await isEmailTaken(email);
    if (isTaken) {
      return res.status(400).json({ message: "Email is already taken" });
    }
    const data = await registerTeacher(name, email, password);
    const user = { name: data.name, email: data.email, role: data.role };
    res.status(201).json({ message: "Teacher registered successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error registering teacher", error });
  }
}

export const loginController = async(req: Request, res: Response) => {
  try {
    const { email, password } = req.body as LoginRequest;
    const token = await login(email, password);
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
}