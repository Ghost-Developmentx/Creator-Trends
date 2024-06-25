import User from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUser } from "@/types/user"; // Assuming you have this type defined

// Custom error classes for better error handling
export class UserExistsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UserExistsError";
  }
}

export class InvalidCredentialsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidCredentialsError";
  }
}

export class ConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ConfigurationError";
  }
}

// Get JWT secret from environment variables
const secretKey = process.env.JWT_SECRET;
if (!secretKey) {
  throw new ConfigurationError(
    "JWT_SECRET is not defined in environment variables",
  );
}

const AuthService = {
  // Register a new user
  async register(
    email: string,
    password: string,
    username: string,
  ): Promise<string> {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new UserExistsError("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      password: hashedPassword,
      username,
    }); // Include username

    return this.generateToken(newUser);
  },

  // Login an existing user
  async login(email: string, password: string): Promise<string> {
    const user = await User.findOne({ where: { email } });
    if (!user || !user.password) {
      throw new InvalidCredentialsError("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new InvalidCredentialsError("Invalid credentials");
    }

    return this.generateToken(user);
  },

  // Generate JWT token
  generateToken(user: IUser): string {
    return jwt.sign({ id: user.id, email: user.email }, secretKey, {
      expiresIn: "1h",
    });
  },
};

export default AuthService;
