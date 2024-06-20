"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = exports.validateRegister = void 0;
const zod_1 = require("zod");
const registerSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
const loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
/**
 * Validate registration input.
 *
 * @param data - Input data for registration
 * @returns Validated data
 * @throws Validation error if input is invalid
 */
const validateRegister = (data) => {
    return registerSchema.parse(data);
};
exports.validateRegister = validateRegister;
/**
 * Validate login input.
 *
 * @param data - Input data for login
 * @returns Validated data
 * @throws Validation error if input is invalid
 */
const validateLogin = (data) => {
    return loginSchema.parse(data);
};
exports.validateLogin = validateLogin;
