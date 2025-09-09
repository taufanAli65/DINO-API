import { Router, Request, Response } from "express";
import { asyncHandler } from "../utils/async_handler";
import { authenticate } from "../middlewares/authentication";
import { sendSuccess } from "../utils/send_responses";
import { deleteUserController } from "../controllers/user.controller";
import { authorize } from "../middlewares/authorization";
import { UserRole } from "../types/auth_types";

const router = Router();

router.get("/me", authenticate, async(req: Request, res: Response) => {
    sendSuccess(res, 200, "User info retrieved successfully", { user: req.user });
});

router.delete("/:id", authenticate, authorize(UserRole.TEACHER), asyncHandler(deleteUserController));

export default router;