"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }

    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }

      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }

      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }

      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
// tests/auth.test.ts
const express_1 = __importDefault(require("express"));
const supertest_1 = __importDefault(require("supertest")); // Use default import for supertest
const db_1 = __importDefault(require("../config/db"));
const auth_1 = __importDefault(require("../routes/auth"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/auth", auth_1.default);
beforeAll(() =>
  __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.default.sync({ force: true }); // Reset the database
  }),
);
afterAll(() =>
  __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.default.close();
  }),
);
describe("Auth Endpoints", () => {
  it("should register a new user", () =>
    __awaiter(void 0, void 0, void 0, function* () {
      const res = yield (0, supertest_1.default)(app)
        .post("/api/auth/register")
        .send({
          email: "test@example.com",
          password: "password123",
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("token");
    }));
  it("should login an existing user", () =>
    __awaiter(void 0, void 0, void 0, function* () {
      const res = yield (0, supertest_1.default)(app)
        .post("/api/auth/login")
        .send({
          email: "test@example.com",
          password: "password123",
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("token");
    }));
  it("should not login with incorrect credentials", () =>
    __awaiter(void 0, void 0, void 0, function* () {
      const res = yield (0, supertest_1.default)(app)
        .post("/api/auth/login")
        .send({
          email: "test@example.com",
          password: "wrongpassword",
        });
      expect(res.statusCode).toEqual(401);
    }));
});
