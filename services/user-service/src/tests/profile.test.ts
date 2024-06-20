import request from "supertest";
import app from "../server";
import User from "../models/user";

describe("Profile Endpoints", () => {
  let token: string;
  let userId: number;

  beforeAll(async () => {
    await global.setupTestUser();
    const user = await User.findOne({ where: { email: "test@example.com" } });
    if (!user) {
      throw new Error("Test user not found");
    }
    userId = user.id;

    const res = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "testpassword",
    });
    token = res.body.token;
  });

  it("should get a user profile", async () => {
    const res = await request(app)
      .get(`/api/profile/${userId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("email", "test@example.com");
  });

  it("should update a user profile", async () => {
    const res = await request(app)
      .put(`/api/profile/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        email: "updated@example.com",
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("email", "updated@example.com");
  });
});
