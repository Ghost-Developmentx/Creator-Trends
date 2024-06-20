import { Request, Response } from "express";
import profileService from "../services/profileService";
import {
  validateUserId,
  validateUserProfileUpdate,
} from "@/validators/profileValidators";
import { handleServiceError, logError } from "@utils/errorHandlers";
import { StatusCodes } from "@/constants/http-status-codes";

/**
 * Get the profile of a user by ID.
 *
 * @param req - Express request object
 * @param res - Express response object
 */
export const getProfile = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = validateUserId(req.params.id);
    const user = await profileService.getProfile(userId);
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    logError("getProfile", error);
    handleServiceError(error, res);
  }
};

/**
 * Update the profile of a user by ID.
 *
 * @param req - Express request object
 * @param res - Express response object
 */
export const updateProfile = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = validateUserId(req.params.id);
    const updates = validateUserProfileUpdate(req.body);
    const user = await profileService.updateProfile(userId, updates);
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    logError("updateProfile", error);
    handleServiceError(error, res);
  }
};
