// server.ts
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import connectDB from './config/db';
import authRoutes from './routes/auth';

dotenv.config(); // Load environment variables

const app = express();
const port = 3000; // You can choose any port you prefer

async function startServer() {
    try {
        await connectDB(); // Await the database connection
        console.log("Database connected successfully"); // Added logging for success

        // Security Middleware
        app.use(helmet());
        app.use(cors());

        // Rate Limiting Middleware
        const limiter = rateLimit({
            windowMs: 15 * 60 * 1000,
            limit: 100,
            standardHeaders: true,
            legacyHeaders: false,
        });
        app.use(limiter);

        // Body Parsing Middleware for Json
        app.use(express.json());

        // Routes
        app.use('/api/auth', authRoutes);

        // Error Handling Middleware (unchanged)
        app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
            console.error(err.stack); // Log the error for debugging
            res.status(500).json({error: 'Internal Server Error'});
        });

        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });

        app.get('/', (_req, res) => {
            res.send('Creator Trends Backend is running!');
        });
    } catch (err) {
        console.error('Error starting server:', err); // Handle errors
    }
}

startServer().catch((err) => {
    console.error('Error starting server:', err);
    process.exit(1); // Exit with an error code
});