import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/app_error';
import { UserRole } from "../types/auth.types";

export const authorize = (...roles: UserRole[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const user = (req as any).user;
        if (!user) {
            return next(AppError('Unauthorized', 401));
        }

        if (!roles.includes(user.role as UserRole)) {
            return next(AppError('Forbidden: insufficient permissions', 403));
        }

        next();
    };
};
