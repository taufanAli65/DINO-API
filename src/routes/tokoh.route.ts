import { Router } from "express";
import { createTokohController, updateTokohController, deleteTokohController, getAllTokohController, getTokohByIdController } from "../controllers/tokoh.controller";
import { authenticate } from "../middlewares/authentication";
import { authorize } from "../middlewares/authorization";
import { UserRole } from "../types/auth.types";
import { upload } from "../middlewares/upload";

const router = Router();

router.use(authenticate);

router.get("/", getAllTokohController);
router.get("/:id", getTokohByIdController);
router.post("/", authorize(UserRole.TEACHER), upload.single('photo'), createTokohController);
router.put("/:id", authorize(UserRole.TEACHER), upload.single('photo'), updateTokohController);
router.delete("/:id", authorize(UserRole.TEACHER), deleteTokohController);

export default router;
