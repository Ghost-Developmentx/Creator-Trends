import { Response } from "express";
import { ZodError } from "zod";
import {
  InvalidUserIdError,
  UserNotFoundError,
  ConfigurationError,
} from "@services/profileService";
import {
  UserExistsError,
  InvalidCredentialsError,
} from "@services/authService";
import { StatusCodes } from "@/constants/http-status-codes";

/**
 * Handle service errors and send appropriate responses.
 *
 * @param err - Error object
 * @param res - Express response object
 */
export const handleServiceError = (err: any, res: Response) => {
  if (err instanceof ZodError) {
    res.status(StatusCodes.BAD_REQUEST).json({ errors: err.errors });
  } else if (err instanceof UserExistsError) {
    res.status(StatusCodes.CONFLICT).json({ error: err.message });
  } else if (err instanceof InvalidCredentialsError) {
    res.status(StatusCodes.UNAUTHORIZED).json({ error: "Invalid credentials" });
  } else if (err instanceof ConfigurationError) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  } else if (err instanceof InvalidUserIdError) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
  } else if (err instanceof UserNotFoundError) {
    res.status(StatusCodes.NOT_FOUND).json({ error: err.message });
  } else {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};

/**
 * Log errors for debugging purposes.
 *
 * @param context - Context or source of the error
 * @param err - Error object
 */
export const logError = (context: string, err: any) => {
  console.error(`Error in ${context}:`, err);
};
