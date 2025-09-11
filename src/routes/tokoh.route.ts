import { Router } from "express";
import { createTokohController, updateTokohController, deleteTokohController, getAllTokohController, getTokohByIdController } from "../controllers/tokoh.controller";
import { authenticate } from "../middlewares/authentication";
import { authorize } from "../middlewares/authorization";
import { UserRole } from "../types/auth.types";

const router = Router();

router.use(authenticate);

router.get("/", getAllTokohController);
router.get("/:id", getTokohByIdController);
router.post("/", authorize(UserRole.TEACHER), createTokohController);
router.put("/:id", authorize(UserRole.TEACHER), updateTokohController);
router.delete("/:id", authorize(UserRole.TEACHER), deleteTokohController);

export default router;
