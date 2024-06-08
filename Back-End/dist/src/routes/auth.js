var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import { z } from "zod"; // Import Zod for validation
import User from "../models/user.js"; // Import the User model
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as process from "node:process";
import mongoose from "mongoose";
const router = express.Router();
const registerSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6)
});
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = registerSchema.parse(req.body);
        const existingUser = yield User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: [{ code: 'unique', message: 'Email already exists' }] });
        }
        const salt = yield bcrypt.genSalt(10);
        const hashedPassword = yield bcrypt.hash(password, salt);
        const newUser = new User({ email, password: hashedPassword });
        yield newUser.save();
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 });
        res.status(201).json({ token });
    }
    catch (err) {
        if (err instanceof z.ZodError) {
            res.status(400).json({ error: err.errors }); // Return the validation errors
        }
        else if (err instanceof mongoose.Error.ValidationError && err.errors['email'].kind === 'unique') {
            res.status(400).json({ error: [{ code: 'unique', message: 'Email already exists' }] });
        }
        else if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        }
        else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
}));
const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});
// User login route
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = loginSchema.parse(req.body);
        const user = yield User.findOne({ email });
        if (!user || !user.password) {
            return res.status(401).json({ error: 'Invalid credentials' }); // Unauthorized
        }
        if (user.password) {
            const isMatch = yield bcrypt.compare(password, user.password.toString());
            if (!isMatch) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }
        }
        else {
            return res.status(401).json({ error: 'User does not have a password' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    }
    catch (err) {
        if (err instanceof z.ZodError) {
            res.status(400).json({ error: err.errors }); // Return the validation errors
        }
        else {
            console.error(err);
            res.status(500).json({ error: 'Server Error' });
        }
    }
}));
export default router;
