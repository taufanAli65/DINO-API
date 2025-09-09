import { getUserByEmail } from "../repositories/user.repository";
import { comparePassword } from "../lib/password";
import jwt from 'jsonwebtoken';
import { AppError } from "../utils/app_error";

export const login = async (email: string, password: string) => {
  try {
    const user = await getUserByEmail(email);
    if (!user) {
        return AppError("User not found", 404);
    }
    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
        return AppError("Invalid password", 401);
    }
    const token = jwt.sign(
            { id: user.id.toString(), email: user.email, role: user.role },
            process.env.JWT_SECRET as string,
            { expiresIn: "1d" }
        );
    return token;
  } catch (error) {
    console.error("Error logging in:", error);
    throw new Error("Error logging in");
  }
}