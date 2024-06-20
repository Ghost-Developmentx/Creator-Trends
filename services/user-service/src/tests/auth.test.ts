import request from "supertest";
import app from "../server";
import User from "../models/user";
import * as bcrypt from "bcrypt";

describe("Auth Endpoints", () => {
  it("should register a new user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      email: "newuser@example.com",
      password: "password123",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("token");
  });

  it("should not register a user with existing email", async () => {
    const hashedPassword = await bcrypt.hash("existingpassword", 10);
    await User.create({
      email: "existing@example.com",
      password: hashedPassword,
    });

    const res = await request(app).post("/api/auth/register").send({
      email: "existing@example.com",
      password: "password123",
    });
    expect(res.statusCode).toEqual(409);
    expect(res.body).toHaveProperty("error");
  });

  it("should login an existing user", async () => {
    const hashedPassword = await bcrypt.hash("testpassword", 10);
    await User.create({
      email: "logintest@example.com",
      password: hashedPassword,
    });

    const res = await request(app).post("/api/auth/login").send({
      email: "logintest@example.com",
      password: "testpassword",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });

  it("should not login with incorrect credentials", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "logintest@example.com",
      password: "wrongpassword",
    });
    expect(res.statusCode).toEqual(401);
  });

  it("should handle validation errors on register", async () => {
    const res = await request(app).post("/api/auth/register").send({
      email: "invalidemail",
      password: "short",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("errors");
  });
});
