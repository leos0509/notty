import e, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required." });
    return;
  }

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!existingUser) {
      res.status(400).json({ error: "Invalid email or password." });
      return;
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      res.status(400).json({ error: "Invalid email or password." });
      return;
    }

    const token = jwt.sign(
      { id: existingUser.id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      token,
      user: {
        id: existingUser.id,
        email: existingUser.email,
        name: existingUser.name,
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ error: "Name, email, and password are required." });
  }

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      res.status(400).json({ error: "User already exist." });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const token = jwt.sign(
      { id: newUser.id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1d",
      }
    );

    res.status(201).json({newUser, token});
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
