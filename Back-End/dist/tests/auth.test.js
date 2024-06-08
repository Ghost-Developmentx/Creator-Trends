var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// tests/auth.test.ts
import request from 'supertest';
import app from '../src/server.js'; // Import your Express app
// import User from '../src/models/user';
import mongoose from 'mongoose';
import User from "../src/models/user.js";
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose.connect('mongodb://127.0.0.1:27017/creator-trends-test');
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield User.deleteMany({}); // Delete all users from the test database
    yield mongoose.connection.close();
}));
describe('GET /', () => {
    it('responds with a JSON message', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Creator Trends Backend is running!' });
    }));
});
describe('POST /api/auth/register', () => {
    it('should register a new user', () => __awaiter(void 0, void 0, void 0, function* () {
        // ... (your existing successful registration test)
    }));
    it('should fail to register a user with a duplicate email', () => __awaiter(void 0, void 0, void 0, function* () {
        const existingUser = yield User.create({
            email: 'duplicate@example.com',
            password: 'password123',
        });
        const res = yield request(app)
            .post('/api/auth/register')
            .send({
            email: 'duplicate@example.com', // Duplicate email
            password: 'password123',
        });
        expect(res.status).toBe(400);
        expect(res.body.error[0]).toHaveProperty('message', 'Email already exists');
        // Clean up (delete the user after the test)
        yield existingUser.deleteOne();
    }));
    it('should fail to register a user with an invalid email', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request(app)
            .post('/api/auth/register')
            .send({
            email: 'invalidemail', // Invalid email format
            password: 'password123',
        });
        expect(res.status).toBe(400);
        expect(res.body.error[0]).toHaveProperty('code', 'invalid_string');
        expect(res.body.error[0]).toHaveProperty('message', 'Invalid email address');
    }));
    it('should fail to register a user with a short password', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request(app)
            .post('/api/auth/register')
            .send({
            email: 'testuser2@example.com',
            password: 'short', // Password shorter than 6 characters
        });
        expect(res.status).toBe(400);
        expect(res.body.error[0]).toHaveProperty('code', 'too_small');
        expect(res.body.error[0]).toHaveProperty('minimum', 6);
        expect(res.body.error[0]).toHaveProperty('type', 'string');
    }));
});
describe('POST /api/auth/login', () => {
    it('should log in with valid credentials', () => __awaiter(void 0, void 0, void 0, function* () {
        // ... (your existing successful login test)
    }));
    it('should fail to log in with an invalid email', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request(app)
            .post('/api/auth/login')
            .send({
            email: 'nonexistent@example.com', // Non-existent email
            password: 'password123',
        });
        expect(res.status).toBe(401); // Unauthorized
        expect(res.body).toHaveProperty('error', 'Invalid credentials');
    }));
    it('should fail to log in with an incorrect password', () => __awaiter(void 0, void 0, void 0, function* () {
        // Register a user first for this test
        yield request(app)
            .post('/api/auth/register')
            .send({
            email: 'testuser3@example.com',
            password: 'password123',
        });
        // Attempt to log in with an incorrect password
        const res = yield request(app)
            .post('/api/auth/login')
            .send({
            email: 'testuser3@example.com',
            password: 'wrongpassword',
        });
        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty('error', 'Invalid credentials');
    }));
});
// ...
it('should handle invalid JSON in request body', () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield request(app)
        .post('/api/auth/register')
        .send('invalid json'); // Send invalid JSON
    expect(res.status).toBe(400); // Bad Request
    expect(res.body).toHaveProperty('error');
}));
// ...
it('should apply helmet security headers', () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield request(app).get('/');
    // Check for some common Helmet headers
    expect(res.headers).toHaveProperty('x-xss-protection');
    expect(res.headers).toHaveProperty('strict-transport-security');
    // ... (check for other headers)
}));
