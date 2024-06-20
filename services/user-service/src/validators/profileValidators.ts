import { z } from "zod";
import { InvalidUserIdError } from "@services/profileService";

const userIdSchema = z.number().int().positive();
const userProfileUpdateSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  bio: z.string().optional(),
  // Add other fields as needed
});

/**
 * Validate and parse user ID.
 *
 * @param id - User ID from request parameters
 * @returns Validated user ID
 * @throws InvalidUserIdError if validation fails
 */
export const validateUserId = (id: any): number => {
  const parsedId = userIdSchema.safeParse(Number(id));
  if (!parsedId.success) {
    throw new InvalidUserIdError(); // No argument needed
  }
  return parsedId.data;
};

/**
 * Validate and parse user profile update data.
 *
 * @param data - User profile data from request body
 * @returns Validated user profile data
 * @throws ValidationError if validation fails
 */
export const validateUserProfileUpdate = (data: any) => {
  return userProfileUpdateSchema.parse(data);
};
