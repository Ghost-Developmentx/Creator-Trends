"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const authService_1 = __importDefault(require("../services/authService"));
const authValidators_1 = require("@/validators/authValidators");
const errorHandlers_1 = require("@utils/errorHandlers");
const http_status_codes_1 = require("@/constants/http-status-codes");
/**
 * Register a new user.
 *
 * @param req - Express request object
 * @param res - Express response object
 */
const register = async (req, res) => {
    try {
        const { email, password } = (0, authValidators_1.validateRegister)(req.body);
        const token = await authService_1.default.register(email, password);
        res.status(http_status_codes_1.StatusCodes.CREATED).json({ token });
    }
    catch (err) {
        (0, errorHandlers_1.logError)("register", err);
        (0, errorHandlers_1.handleServiceError)(err, res);
    }
};
exports.register = register;
/**
 * Login an existing user.
 *
 * @param req - Express request object
 * @param res - Express response object
 */
const login = async (req, res) => {
    try {
        const { email, password } = (0, authValidators_1.validateLogin)(req.body);
        const token = await authService_1.default.login(email, password);
        res.status(http_status_codes_1.StatusCodes.OK).json({ token });
    }
    catch (err) {
        (0, errorHandlers_1.logError)("login", err);
        (0, errorHandlers_1.handleServiceError)(err, res);
    }
};
exports.login = login;
