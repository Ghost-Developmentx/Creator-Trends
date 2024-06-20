"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigurationError = exports.InvalidCredentialsError = exports.UserExistsError = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Custom error classes for better error handling
class UserExistsError extends Error {
    constructor(message) {
        super(message);
        this.name = "UserExistsError";
    }
}
exports.UserExistsError = UserExistsError;
class InvalidCredentialsError extends Error {
    constructor(message) {
        super(message);
        this.name = "InvalidCredentialsError";
    }
}
exports.InvalidCredentialsError = InvalidCredentialsError;
class ConfigurationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ConfigurationError";
    }
}
exports.ConfigurationError = ConfigurationError;
// Get JWT secret from environment variables
const secretKey = process.env.JWT_SECRET;
if (!secretKey) {
    throw new ConfigurationError("JWT_SECRET is not defined in environment variables");
}
const AuthService = {
    // Register a new user
    async register(email, password) {
        const existingUser = await user_1.default.findOne({ where: { email } });
        if (existingUser) {
            throw new UserExistsError("User already exists");
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const newUser = await user_1.default.create({ email, password: hashedPassword });
        return this.generateToken(newUser);
    },
    // Login an existing user
    async login(email, password) {
        const user = await user_1.default.findOne({ where: { email } });
        if (!user || !user.password) {
            throw new InvalidCredentialsError("Invalid credentials");
        }
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            throw new InvalidCredentialsError("Invalid credentials");
        }
        return this.generateToken(user);
    },
    // Generate JWT token
    generateToken(user) {
        return jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, secretKey, {
            expiresIn: "1h",
        });
    },
};
exports.default = AuthService;
