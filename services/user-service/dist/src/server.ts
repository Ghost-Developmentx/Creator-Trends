import express, { Request, Response, NextFunction } from "express";
import sequelize from "./config/db";
import authRoutes from "./routes/auth";
import profileRoutes from "./routes/profile";
import { setupSwagger } from "@config/swagger";
import logger from "./config/logger";

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);

setupSwagger(app);

// Error handling middleware with explicit types
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  logger.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

export const startServer = async () => {
  try {
    await sequelize.sync({ force: process.env.NODE_ENV === "development" });
    logger.info("Database & tables created successfully!");
    const port = process.env.PORT || 3001;
    app.listen(port, () => {
      logger.info(`User Service running on port ${port}`);
    });
  } catch (error) {
    logger.error("Unable to start server:", error);
    process.exit(1);
  }
};

if (require.main === module) {
  startServer()
    .then(() => logger.info("Server started successfully"))
    .catch((error) => {
      logger.error("Error starting server:", error);
      process.exit(1);
    });
}

export default app;
