import { Request, Response } from "express";
import pool from "../db";

export const addTask = async (req: Request, res: Response) => {
  const { title, description, status, duedate, isPinned, isChecked } = req.body;

  if (!title || !description || !status) {
    res
      .status(400)
      .json({ error: "All fields (title, description, status) are required." });
    return;
  }

  try {
    const result = await pool.query(
      "INSERT INTO tasks (title, description, status) VALUES ($1, $2, $3) RETURNING *",
      [title, description, status]
    );
    res.status(201).json(result.rows[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getTask = async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM tasks");
    res.status(200).json(result.rows);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTaskChecked = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'UPDATE tasks SET "isChecked" = NOT "isChecked" WHERE id = $1 RETURNING *',
      [id]
    );
    res.status(200).json(result.rows[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTaskPinned = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'UPDATE tasks SET "isPinned" = NOT "isPinned" WHERE id = $1 RETURNING *',
      [id]
    );
    res.status(200).json(result.rows[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
    res.status(200).json({ message: "Task deleted successfully." });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, status, dueDate, isPinned, isChecked } = req.body;

  try {
    const result = await pool.query(
      'UPDATE tasks SET title = $1, description = $2, status = $3, "dueDate" = $4, "isPinned" = $5, "isChecked" = $6 WHERE id = $7 RETURNING *',
      [title, description, status, dueDate, isPinned, isChecked, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};