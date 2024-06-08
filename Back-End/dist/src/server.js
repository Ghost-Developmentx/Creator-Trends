var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// server.ts
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import instagramRoutes from './routes/api/instagram.js';
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
// Connect to the database
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield connectDB();
            console.log("Database connected successfully");
        }
        catch (error) {
            console.error("Error connecting to the database:", error);
            process.exit(1);
        }
    });
}
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        // General Middleware
        app.use(express.json());
        // Security Middleware
        app.use(helmet());
        app.use(cors({
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: ['Content-Type', 'Authorization']
        }));
        // Rate Limiting Middleware
        const limiter = rateLimit({
            windowMs: 15 * 60 * 1000,
            limit: 100,
            standardHeaders: true,
            legacyHeaders: false,
        });
        app.use(limiter);
        // Request Logging Middleware
        app.use((req, _res, next) => {
            console.log(`Request: ${req.method} ${req.url}`);
            next();
        });
        // Routes
        app.get('/', (_req, res) => {
            res.json({ message: 'Creator Trends Backend is running!' });
        });
        app.use('/api/auth', authRoutes);
        app.use('/api/instagram', instagramRoutes);
        // Error Handling Middleware
        app.use((err, _req, res, _next) => {
            console.error(err.stack); // Log the error for debugging
            res.status(500).json({ error: 'Internal Server Error' });
        });
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
    });
}
connectToDatabase()
    .then(() => startServer())
    .catch((err) => {
    console.error('Error starting server:', err);
    process.exit(1); // Exit the process on failure
});
export default app;
