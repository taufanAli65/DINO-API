import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { roles } from "@prisma/client";

// Pastikan JWT_SECRET ada saat aplikasi dimulai
if (!process.env.JWT_SECRET) {
  throw new Error("FATAL ERROR: JWT_SECRET is not defined.");
}
const JWT_SECRET = process.env.JWT_SECRET;

// Interface untuk payload tetap sama
export interface AuthPayload extends JwtPayload {
  id: string;
  email: string;
  role: roles;
}

// Deklarasi global tetap sama
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
) => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Akses ditolak. Token tidak tersedia." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthPayload;

    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "Token telah kadaluwarsa." });
    }
    return res.status(401).json({ message: "Token tidak valid." });
  }
};