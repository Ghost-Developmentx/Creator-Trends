"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const user_1 = __importDefault(require("../models/user"));
const bcrypt = __importStar(require("bcrypt"));
describe("Auth Endpoints", () => {
    it("should register a new user", async () => {
        const res = await (0, supertest_1.default)(server_1.default).post("/api/auth/register").send({
            email: "newuser@example.com",
            password: "password123",
        });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty("token");
    });
    it("should not register a user with existing email", async () => {
        const hashedPassword = await bcrypt.hash("existingpassword", 10);
        await user_1.default.create({
            email: "existing@example.com",
            password: hashedPassword,
        });
        const res = await (0, supertest_1.default)(server_1.default).post("/api/auth/register").send({
            email: "existing@example.com",
            password: "password123",
        });
        expect(res.statusCode).toEqual(409);
        expect(res.body).toHaveProperty("error");
    });
    it("should login an existing user", async () => {
        const hashedPassword = await bcrypt.hash("testpassword", 10);
        await user_1.default.create({
            email: "logintest@example.com",
            password: hashedPassword,
        });
        const res = await (0, supertest_1.default)(server_1.default).post("/api/auth/login").send({
            email: "logintest@example.com",
            password: "testpassword",
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("token");
    });
    it("should not login with incorrect credentials", async () => {
        const res = await (0, supertest_1.default)(server_1.default).post("/api/auth/login").send({
            email: "logintest@example.com",
            password: "wrongpassword",
        });
        expect(res.statusCode).toEqual(401);
    });
    it("should handle validation errors on register", async () => {
        const res = await (0, supertest_1.default)(server_1.default).post("/api/auth/register").send({
            email: "invalidemail",
            password: "short",
        });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty("errors");
    });
});
