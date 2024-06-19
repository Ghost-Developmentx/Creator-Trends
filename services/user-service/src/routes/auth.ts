// services/user-service/src/routes/auth.ts
import express, { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { z } from "zod";
import { Model } from "sequelize";
import logger from "../config/logger";

// Load environment variables
config();

// Define the router
const router = express.Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: integer
 *           description: The user ID
 *         email:
 *           type: string
 *           description: The user's email
 *         password:
 *           type: string
 *           description: The user's password
 */
interface UserInstance extends Model {
  id: number;
  email: string;
  password: string;
  googleId?: string;
  facebookId?: string;
}

const registerSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6),
});

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Error registering user
 */
router.post("/register", async (req: Request, res: Response) => {
  logger.info("Register route called");
  try {
    const { email, password } = registerSchema.parse(req.body);
    const existingUser = (await User.findOne({
      where: { email },
    })) as UserInstance | null;
    if (existingUser) {
      return res
        .status(400)
        .json({ error: [{ code: "unique", message: "Email already exists" }] });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = (await User.create({
      email,
      password: hashedPassword,
    })) as UserInstance;

    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    res.status(201).json({ token });
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: err.errors });
    } else {
      logger.error("Registration error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", async (req: Request, res: Response) => {
  logger.info("Login route called");
  try {
    const { email, password } = loginSchema.parse(req.body);
    const user = (await User.findOne({
      where: { email },
    })) as UserInstance | null;
    if (!user || !user.password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: err.errors });
    } else {
      logger.error("Login error:", err);
      res.status(500).json({ error: "Server Error" });
    }
  }
});
export default router;
