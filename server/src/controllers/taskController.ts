import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addTask = async (req: Request, res: Response) => {
  const { title, description, dueDate, status, userId } = req.body;

  console.log(req.body);

  if (!title || !description || !dueDate || !status || !userId) {
    res.status(400).json({
      error:
        "All fields (title, description, dueDate, status, userId) are required.",
    });
    return;
  }

  try {
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        dueDate: new Date(dueDate),
        status,
        userId: userId,
      },
    });
    res.status(201).json(newTask);
  } catch (error: any) {
    console.error("Error adding task:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  const { userId } = req.body;

  try {
    const tasks = await prisma.task.findMany({
      where: {
        userId: userId,
      },
    });
    res.status(200).json(tasks);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const task = await prisma.task.findFirst({
      where: {
        id: parseInt(id),
        userId: userId,
      },
    });

    if (!task) {
      res.status(404).json({ error: "Task not found" });
      return;
    }

    res.status(200).json(task);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTaskChecked = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const existingTask = await prisma.task.findFirst({
      where: {
        id: parseInt(id),
        userId: userId,
      },
    });

    if (!existingTask) {
      res.status(404).json({ error: "Task not found" });
      return;
    }

    const task = await prisma.task.update({
      where: {
        id: parseInt(id),
        userId: userId,
      },
      data: {
        isChecked: !existingTask.isChecked,
      },
    });

    res.status(200).json(task);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTaskPinned = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const existingTask = await prisma.task.findFirst({
      where: {
        id: parseInt(id),
        userId: userId,
      },
    });

    if (!existingTask) {
      res.status(404).json({ error: "Task not found" });
      return;
    }

    const task = await prisma.task.update({
      where: {
        id: parseInt(id),
        userId: userId,
      },
      data: {
        isPinned: !existingTask.isPinned,
      },
    });

    res.status(200).json(task);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const deletedTask = await prisma.task.delete({
      where: {
        id: parseInt(id),
        userId: userId,
      },
    });

    res
      .status(200)
      .json({ message: "Task deleted successfully", task: deletedTask });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, status, dueDate, isPinned, isChecked, userId } =
    req.body;

  try {
    const updatedTask = await prisma.task.update({
      where: {
        id: parseInt(id),
        userId: userId,
      },
      data: {
        title,
        description,
        status,
        dueDate: new Date(dueDate),
        isPinned,
        isChecked,
      },
    });

    res.status(200).json(updatedTask);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
