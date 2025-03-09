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

const router = express.Router();

router.post("/", addTask);
router.get("/", getTasks);
router.get("/:id", getTask);
router.patch("/checked/:id", updateTaskChecked);
router.patch("/pinned/:id", updateTaskPinned);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;