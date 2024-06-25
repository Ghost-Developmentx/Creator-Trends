import User from "../models/user";
import { IUser } from "@/types/user";

// Custom Error Classes
export class InvalidUserIdError extends Error {
  constructor(message = "Invalid user ID") {
    super(message);
    this.name = "InvalidUserIdError";
  }
}

export class UserNotFoundError extends Error {
  constructor(userId: number) {
    super(`User with ID ${userId} not found`);
    this.name = "UserNotFoundError";
  }
}

export class ConfigurationError extends Error {
  constructor(message = "Configuration error") {
    super(message);
    this.name = "ConfigurationError";
  }
}

class ProfileService {
  /**
   * Retrieve a user's profile by user ID.
   *
   * @param userId - The ID of the user
   * @returns The user's profile as an IUser object
   * @throws InvalidUserIdError if the user ID is invalid
   * @throws UserNotFoundError if the user does not exist
   */
  async getProfile(userId: number): Promise<IUser> {
    if (!Number.isInteger(userId) || userId <= 0) {
      throw new InvalidUserIdError();
    }

    const user = await User.findByPk(userId);
    if (!user) {
      throw new UserNotFoundError(userId);
    }
    return user.toJSON() as IUser;
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
  async updateProfile(
    userId: number,
    updates: Partial<Omit<IUser, "id">>,
  ): Promise<IUser> {
    if (!Number.isInteger(userId) || userId <= 0) {
      throw new InvalidUserIdError();
    }

    const user = await User.findByPk(userId);
    if (!user) {
      throw new UserNotFoundError(userId);
    }

    await user.update(updates);
    return user.toJSON() as IUser;
  }

  /**
   * Retrieve all user profiles.
   *
   * @returns An array of IUser objects representing all user profiles
   */
  async getAllProfiles(): Promise<IUser[]> {
    const users = await User.findAll();
    return users.map((user) => user.toJSON() as IUser);
  }
}

export default new ProfileService();
