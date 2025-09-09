import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { roles } from "@prisma/client";

export interface AuthPayload {
  id: string;
  email: string;
  role: roles;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    throw new Error("Authorization token missing");
  }
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as AuthPayload;

    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role as roles,
    };

    next();
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
};