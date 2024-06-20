import { z } from "zod";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

/**
 * Validate registration input.
 *
 * @param data - Input data for registration
 * @returns Validated data
 * @throws Validation error if input is invalid
 */
export const validateRegister = (data: any) => {
  return registerSchema.parse(data);
};

/**
 * Validate login input.
 *
 * @param data - Input data for login
 * @returns Validated data
 * @throws Validation error if input is invalid
 */
export const validateLogin = (data: any) => {
  return loginSchema.parse(data);
};
