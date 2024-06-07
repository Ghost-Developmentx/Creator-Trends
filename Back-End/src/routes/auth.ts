import express from 'express';
import {z} from "zod";  // Import Zod for validation
import User from "../models/user"; // Import the User model
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as process from "node:process";


const router = express.Router();

const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
});

router.post("/register", async (req, res) => {
    try {
        const {email, password} = registerSchema.parse(req.body)
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({message: "Email already exists"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({email, password: hashedPassword});
        await newUser.save();

        const token = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET!, {expiresIn: 60 * 60});
        res.status(201).json({token});
    } catch (err) {
        if (err instanceof z.ZodError) {
            res.status(400).json({error: err.errors}); // Return the validation errors
        } else {
            res.status(500).json({error: 'Server Error'});
        }
    }
});
const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

// User login route
router.post('/login', async (req, res) => {
    try {
        // Validate the request body using the Zod schema
        const {email, password} = loginSchema.parse(req.body);
        // Find the user by email
        const user = await User.findOne({email});
        if (!user) {
            return res.status(401).json({error: 'Invalid credentials'}); // Unauthorized
        }
        // Compare the provided password with the stored hashed password
        const isMatch = bcrypt.compare(password, user.password as string); // Non-null assertion as password is required for login
        if (!isMatch) {
            return res.status(401).json({error: 'Invalid credentials'}); // Unauthorized
        }
        // Generate a JWT token (replace with your actual secret)
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET!, {expiresIn: '1h'});
        res.json({token});
    } catch (err) {
        if (err instanceof z.ZodError) {
            // Handle Zod validation errors
            res.status(400).json({error: err.errors}); // Return the validation errors
        } else {
            // Handle other errors (e.g., database errors)
            res.status(500).json({error: 'Server Error'});
        }
    }
});

export default router;
