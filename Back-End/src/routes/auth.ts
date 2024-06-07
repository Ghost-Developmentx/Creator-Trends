import express from 'express';
import { z } from "zod";  // Import Zod for validation
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
        const { email, password } = registerSchema.parse(req.body)

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET!, { expiresIn: 60 * 60 });
        res.status(201).json({ token });
    } catch (err) {
        if (err instanceof z.ZodError) {
            res.status(400).json({ error: err.errors }); // Return the validation errors
        } else {
            res.status(500).json({ error: 'Server Error' });
        }
    }
});

export default router;
