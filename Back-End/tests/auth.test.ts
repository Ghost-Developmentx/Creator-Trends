// tests/auth.test.ts
import request from 'supertest';
import app from '../src/server'; // Import your Express app
// import User from '../src/models/user';
import mongoose from 'mongoose';
import User from "../src/models/user";


beforeAll(async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/creator-trends-test');
});

afterAll(async () => {
    await User.deleteMany({}); // Delete all users from the test database
    await mongoose.connection.close();
});


describe('GET /', () => {
    it('responds with a JSON message', async () => {
        const response = await request(app).get('/');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({message: 'Creator Trends Backend is running!'});
    });
});


describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
        // ... (your existing successful registration test)
    });

    it('should fail to register a user with a duplicate email', async () => {
        const existingUser = await User.create({
            email: 'duplicate@example.com',
            password: 'password123',
        });

        const res = await request(app)
            .post('/api/auth/register')
            .send({
                email: 'duplicate@example.com', // Duplicate email
                password: 'password123',
            });

        expect(res.status).toBe(400);
        expect(res.body.error[0]).toHaveProperty('message', 'Email already exists');

        // Clean up (delete the user after the test)
        await existingUser.deleteOne();
    });

    it('should fail to register a user with an invalid email', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                email: 'invalidemail', // Invalid email format
                password: 'password123',
            });

        expect(res.status).toBe(400);
        expect(res.body.error[0]).toHaveProperty('code', 'invalid_string');
        expect(res.body.error[0]).toHaveProperty('message', 'Invalid email address');

    });

    it('should fail to register a user with a short password', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                email: 'testuser2@example.com',
                password: 'short', // Password shorter than 6 characters
            });

        expect(res.status).toBe(400);
        expect(res.body.error[0]).toHaveProperty('code', 'too_small');
        expect(res.body.error[0]).toHaveProperty('minimum', 6);
        expect(res.body.error[0]).toHaveProperty('type', 'string');
    });
});

describe('POST /api/auth/login', () => {
    it('should log in with valid credentials', async () => {
        // ... (your existing successful login test)
    });

    it('should fail to log in with an invalid email', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'nonexistent@example.com', // Non-existent email
                password: 'password123',
            });

        expect(res.status).toBe(401); // Unauthorized
        expect(res.body).toHaveProperty('error', 'Invalid credentials');
    });

    it('should fail to log in with an incorrect password', async () => {
        // Register a user first for this test
        await request(app)
            .post('/api/auth/register')
            .send({
                email: 'testuser3@example.com',
                password: 'password123',
            });

        // Attempt to log in with an incorrect password
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'testuser3@example.com',
                password: 'wrongpassword',
            });

        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty('error', 'Invalid credentials');
    });
});

// ...

it('should handle invalid JSON in request body', async () => {
    const res = await request(app)
        .post('/api/auth/register')
        .send('invalid json'); // Send invalid JSON

    expect(res.status).toBe(400); // Bad Request
    expect(res.body).toHaveProperty('error');
});

// ...

it('should apply helmet security headers', async () => {
    const res = await request(app).get('/');

    // Check for some common Helmet headers
    expect(res.headers).toHaveProperty('x-xss-protection');
    expect(res.headers).toHaveProperty('strict-transport-security');
    // ... (check for other headers)
});
