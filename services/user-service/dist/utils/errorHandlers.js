"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logError = exports.handleServiceError = void 0;
const zod_1 = require("zod");
const profileService_1 = require("@services/profileService");
const authService_1 = require("@services/authService");
const http_status_codes_1 = require("@/constants/http-status-codes");
/**
 * Handle service errors and send appropriate responses.
 *
 * @param err - Error object
 * @param res - Express response object
 */
const handleServiceError = (err, res) => {
    if (err instanceof zod_1.ZodError) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ errors: err.errors });
    }
    else if (err instanceof authService_1.UserExistsError) {
        res.status(http_status_codes_1.StatusCodes.CONFLICT).json({ error: err.message });
    }
    else if (err instanceof authService_1.InvalidCredentialsError) {
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ error: "Invalid credentials" });
    }
    else if (err instanceof profileService_1.ConfigurationError) {
        res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: "Internal server error" });
    }
    else if (err instanceof profileService_1.InvalidUserIdError) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ error: err.message });
    }
    else if (err instanceof profileService_1.UserNotFoundError) {
        res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ error: err.message });
    }
    else {
        res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: "Internal server error" });
    }
};
exports.handleServiceError = handleServiceError;
/**
 * Log errors for debugging purposes.
 *
 * @param context - Context or source of the error
 * @param err - Error object
 */
const logError = (context, err) => {
    console.error(`Error in ${context}:`, err);
};
exports.logError = logError;
