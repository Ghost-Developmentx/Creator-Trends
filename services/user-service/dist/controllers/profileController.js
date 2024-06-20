"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.getProfile = void 0;
const profileService_1 = __importDefault(require("../services/profileService"));
const profileValidators_1 = require("@/validators/profileValidators");
const errorHandlers_1 = require("@utils/errorHandlers");
const http_status_codes_1 = require("@/constants/http-status-codes");
/**
 * Get the profile of a user by ID.
 *
 * @param req - Express request object
 * @param res - Express response object
 */
const getProfile = async (req, res) => {
    try {
        const userId = (0, profileValidators_1.validateUserId)(req.params.id);
        const user = await profileService_1.default.getProfile(userId);
        res.status(http_status_codes_1.StatusCodes.OK).json(user);
    }
    catch (error) {
        (0, errorHandlers_1.logError)("getProfile", error);
        (0, errorHandlers_1.handleServiceError)(error, res);
    }
};
exports.getProfile = getProfile;
/**
 * Update the profile of a user by ID.
 *
 * @param req - Express request object
 * @param res - Express response object
 */
const updateProfile = async (req, res) => {
    try {
        const userId = (0, profileValidators_1.validateUserId)(req.params.id);
        const updates = (0, profileValidators_1.validateUserProfileUpdate)(req.body);
        const user = await profileService_1.default.updateProfile(userId, updates);
        res.status(http_status_codes_1.StatusCodes.OK).json(user);
    }
    catch (error) {
        (0, errorHandlers_1.logError)("updateProfile", error);
        (0, errorHandlers_1.handleServiceError)(error, res);
    }
};
exports.updateProfile = updateProfile;
