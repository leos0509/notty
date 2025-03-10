import express from "express";
import {
  addTask,
  getTasks,
  updateTaskChecked,
  updateTaskPinned,
  deleteTask,
  updateTask,
  getTask,
} from "../controllers/taskController";
import { authenticate } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/", authenticate, addTask);
router.get("/", authenticate, getTasks);
router.get("/:id", authenticate, getTask);
router.patch("/checked/:id", authenticate, updateTaskChecked);
router.patch("/pinned/:id", authenticate, updateTaskPinned);
router.put("/:id", authenticate, updateTask);
router.delete("/:id", authenticate, deleteTask);

export default router;
