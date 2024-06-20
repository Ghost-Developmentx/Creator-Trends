"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigurationError = exports.UserNotFoundError = exports.InvalidUserIdError = void 0;
const user_1 = __importDefault(require("../models/user"));
// Custom Error Classes
class InvalidUserIdError extends Error {
    constructor(message = "Invalid user ID") {
        super(message);
        this.name = "InvalidUserIdError";
    }
}
exports.InvalidUserIdError = InvalidUserIdError;
class UserNotFoundError extends Error {
    constructor(userId) {
        super(`User with ID ${userId} not found`);
        this.name = "UserNotFoundError";
    }
}
exports.UserNotFoundError = UserNotFoundError;
class ConfigurationError extends Error {
    constructor(message = "Configuration error") {
        super(message);
        this.name = "ConfigurationError";
    }
}
exports.ConfigurationError = ConfigurationError;
class ProfileService {
    /**
     * Retrieve a user's profile by user ID.
     *
     * @param userId - The ID of the user
     * @returns The user's profile as an IUser object
     * @throws InvalidUserIdError if the user ID is invalid
     * @throws UserNotFoundError if the user does not exist
     */
    async getProfile(userId) {
        if (!Number.isInteger(userId) || userId <= 0) {
            throw new InvalidUserIdError();
        }
        const user = await user_1.default.findByPk(userId);
        if (!user) {
            throw new UserNotFoundError(userId);
        }
        return user.toJSON();
    }
    /**
     * Update a user's profile by user ID.
     *
     * @param userId - The ID of the user
     * @param updates - The updates to apply to the user's profile
     * @returns The updated user's profile as an IUser object
     * @throws InvalidUserIdError if the user ID is invalid
     * @throws UserNotFoundError if the user does not exist
     */
    async updateProfile(userId, updates) {
        if (!Number.isInteger(userId) || userId <= 0) {
            throw new InvalidUserIdError();
        }
        const user = await user_1.default.findByPk(userId);
        if (!user) {
            throw new UserNotFoundError(userId);
        }
        await user.update(updates);
        return user.toJSON();
    }
}
exports.default = new ProfileService();
