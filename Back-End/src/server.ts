import dotenv from "dotenv";

dotenv.config();
console.log("API Key:", process.env.RAPIDAPI_KEY);
// server.ts
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import connectDB from "./config/db";
import authRoutes from "./routes/auth";
import instagramRoutes from "./routes/api/instagram";

const app = express();
const port = process.env.PORT || 3000;

// Connect to the database
async function connectToDatabase() {
  try {
    await connectDB();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
}

async function startServer() {
  // General Middleware
  app.use(express.json());

  // Security Middleware
  app.use(helmet());
  app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    }),
  );

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
  app.get("/", (_req, res) => {
    res.json({ message: "Creator Trends Backend is running!" });
  });

  app.use("/api/auth", authRoutes);
  app.use("/api/instagram", instagramRoutes);

  // Error Handling Middleware
  app.use(
    (
      err: Error,
      _req: express.Request,
      res: express.Response,
      _next: express.NextFunction,
    ) => {
      console.error(err.stack); // Log the error for debugging
      res.status(500).json({ error: "Internal Server Error" });
    },
  );

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}

connectToDatabase()
  .then(() => startServer())
  .catch((err) => {
    // Handle errors during server startup
    console.error("Error starting server:", err);
    process.exit(1); // Exit the process on failure
  });

export default app;
