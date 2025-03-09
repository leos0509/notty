import express from "express";
import {
  addTask,
  getTask,
  updateTaskChecked,
  updateTaskPinned,
  deleteTask,
  updateTask,
} from "../controllers/taskController";

const router = express.Router();

router.post("/", addTask);
router.get("/", getTask);
router.put("/checked/:id", updateTaskChecked);
router.put("/pinned/:id", updateTaskPinned);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;