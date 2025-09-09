import { Request, Response, NextFunction } from 'express';
import {roles} from '@prisma/client';
import { AuthenticatedRequest } from '../types/auth_types';

export const authorize = (...roles: roles[]) => {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
        if (!req.user) {
            throw new Error('Unauthorized');
        }

        if (!roles.includes(req.user.role as roles)) {
            throw new Error('Forbidden: insufficient permissions');
        }

        next();
    };
};