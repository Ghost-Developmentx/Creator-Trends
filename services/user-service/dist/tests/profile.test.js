"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const user_1 = __importDefault(require("../models/user"));
describe("Profile Endpoints", () => {
    let token;
    let userId;
    beforeAll(async () => {
        await global.setupTestUser();
        const user = await user_1.default.findOne({ where: { email: "test@example.com" } });
        if (!user) {
            throw new Error("Test user not found");
        }
        userId = user.id;
        const res = await (0, supertest_1.default)(server_1.default).post("/api/auth/login").send({
            email: "test@example.com",
            password: "testpassword",
        });
        token = res.body.token;
    });
    it("should get a user profile", async () => {
        const res = await (0, supertest_1.default)(server_1.default)
            .get(`/api/profile/${userId}`)
            .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("email", "test@example.com");
    });
    it("should update a user profile", async () => {
        const res = await (0, supertest_1.default)(server_1.default)
            .put(`/api/profile/${userId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
            email: "updated@example.com",
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("email", "updated@example.com");
    });
});
