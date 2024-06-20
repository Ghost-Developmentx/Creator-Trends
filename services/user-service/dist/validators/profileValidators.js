"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserProfileUpdate = exports.validateUserId = void 0;
const zod_1 = require("zod");
const profileService_1 = require("@services/profileService");
const userIdSchema = zod_1.z.number().int().positive();
const userProfileUpdateSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    email: zod_1.z.string().email().optional(),
    bio: zod_1.z.string().optional(),
    // Add other fields as needed
});
/**
 * Validate and parse user ID.
 *
 * @param id - User ID from request parameters
 * @returns Validated user ID
 * @throws InvalidUserIdError if validation fails
 */
const validateUserId = (id) => {
    const parsedId = userIdSchema.safeParse(Number(id));
    if (!parsedId.success) {
        throw new profileService_1.InvalidUserIdError(); // No argument needed
    }
    return parsedId.data;
};
exports.validateUserId = validateUserId;
/**
 * Validate and parse user profile update data.
 *
 * @param data - User profile data from request body
 * @returns Validated user profile data
 * @throws ValidationError if validation fails
 */
const validateUserProfileUpdate = (data) => {
    return userProfileUpdateSchema.parse(data);
};
exports.validateUserProfileUpdate = validateUserProfileUpdate;
