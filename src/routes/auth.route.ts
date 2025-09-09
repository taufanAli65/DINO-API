import { registerStudentController, registerTeacherController, loginController } from "../controllers/auth.controller";
import { Router } from "express";
import { asyncHandler } from "../utils/async_handler";

const router = Router();

router.post("/register/student", asyncHandler(registerStudentController));
router.post("/register/teacher", asyncHandler(registerTeacherController));
router.post("/login", asyncHandler(loginController));

export default router;