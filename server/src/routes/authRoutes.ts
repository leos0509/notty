import { Router } from "express";
import {
  signin,
  signup,
} from "../controllers/authController";
import { checkAuth } from "../middlewares/authMiddleware";

const router = Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/check", checkAuth)

export default router;
