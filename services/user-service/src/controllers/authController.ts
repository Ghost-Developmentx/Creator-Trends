import { Request, Response } from "express";
import AuthService from "../services/authService";
import { validateRegister, validateLogin } from "@/validators/authValidators";
import { handleServiceError, logError } from "@utils/errorHandlers";
import { StatusCodes } from "@/constants/http-status-codes";
import { userRegistrations, loginAttempts } from "@/server";

/**
 * Register a new user.
 *
 * @param req - Express request object
 * @param res - Express response object
 */
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, username } = validateRegister(req.body); // Include username in validation
    const token = await AuthService.register(email, password, username); // Pass username to AuthService
    userRegistrations.inc();
    res.status(StatusCodes.CREATED).json({ token });
  } catch (err) {
    logError("register", err);
    handleServiceError(err, res);
  }
};

/**
 * Login an existing user.
 *
 * @param req - Express request object
 * @param res - Express response object
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = validateLogin(req.body);
    const token = await AuthService.login(email, password);
    loginAttempts.inc({ status: "success" });
    res.status(StatusCodes.OK).json({ token });
  } catch (err) {
    loginAttempts.inc({ status: "failure" });
    logError("login", err);
    handleServiceError(err, res);
  }
};
