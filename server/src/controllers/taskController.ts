import { Request, Response } from "express";
import pool from "../db";

export const addTask = async (req: Request, res: Response) => {
  const { title, description, dueDate, status } = req.body;
  const { userid: userId } = req.headers;

  if (!title || !description || !dueDate || !status || !userId) {
    res
      .status(400)
      .json({
        error:
          "All fields (title, description, dueDate, status, userId) are required.",
      });
    return;
  }

  try {
    const result = await pool.query(
      'INSERT INTO tasks (title, description, status, "dueDate", "userId") VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, description, status, dueDate, userId]
    );
    res.status(201).json(result.rows[0]);
  } catch (error: any) {
    console.error('Error inserting task:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getTasks = async (req: Request, res: Response) => {
    const { userid: userId } = req.headers;
  try {
    const result = await pool.query('SELECT * FROM tasks WHERE "userId" = $1', [
      userId,
    ]);
    res.status(200).json(result.rows);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getTask = async (req: Request, res: Response) => {
  const { id } = req.params;
    const { userid: userId } = req.headers;

  try {
    const result = await pool.query(
      'SELECT * FROM tasks WHERE id = $1 AND "userId" = $2',
      [id, userId]
    );
    res.status(200).json(result.rows[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTaskChecked = async (req: Request, res: Response) => {
  const { id } = req.params;
    const { userid: userId } = req.headers;

  try {
    const result = await pool.query(
      'UPDATE tasks SET "isChecked" = NOT "isChecked" WHERE id = $1 AND "userId" = $2 RETURNING *',
      [id, userId]
    );
    res.status(200).json(result.rows[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTaskPinned = async (req: Request, res: Response) => {
  const { id } = req.params;
    const { userid: userId } = req.headers;

  try {
    const result = await pool.query(
      'UPDATE tasks SET "isPinned" = NOT "isPinned" WHERE id = $1 AND "userId" = $2 RETURNING *',
      [id, userId]
    );
    res.status(200).json(result.rows[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;
    const { userid: userId } = req.headers;

  try {
    await pool.query('DELETE FROM tasks WHERE id = $1 AND "userId" = $2', [
      id,
      userId,
    ]);
    res.status(200).json({ message: "Task deleted successfully." });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
    const { userid: userId } = req.headers;
  const { title, description, status, dueDate, isPinned, isChecked } = req.body;

  try {
    const result = await pool.query(
      'UPDATE tasks SET title = $1, description = $2, status = $3, "dueDate" = $4, "isPinned" = $5, "isChecked" = $6 WHERE id = $7 AND "userId" = $8 RETURNING *',
      [title, description, status, dueDate, isPinned, isChecked, id, userId]
    );
    res.status(200).json(result.rows[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
