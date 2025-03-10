import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  omit: {
    user: {
      password: true,
    },
  },
});

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Access Denied: No Token Provided!" });
    return;
  }

  if (!JWT_SECRET) {
    res
      .status(500)
      .json({ message: "Internal Server Error: JWT Secret not set!" });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number };
    req.body = { ...req.body, userId: decoded.id };
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid Token" });
  }
};

export const checkAuth = async (req: Request, res: Response): Promise<void> => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
      res.status(401).json({ message: "Authorization header missing", isAuthenticated: false });
      return;
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "Token missing from Authorization header", isAuthenticated: false });
      return;
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded || typeof decoded !== "object" || !("id" in decoded)) {
      res.status(401).json({ message: "Invalid token", isAuthenticated: false });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: (decoded as { id: number }).id },
    });

    if (!user) {
      res.status(404).json({ message: "User not found", isAuthenticated: false });
      return;
    }

    res.json({ isAuthenticated: true, user });
  } catch (error: any) {
    console.error("Error authenticating token:", error);
    res.status(500).json({ message: `Error authenticating token: ${error.message}`, isAuthenticated: false });
  }
};
