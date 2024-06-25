import "module-alias/register";
import express, { Request, Response, NextFunction } from "express";
import { Sequelize } from "sequelize";
import promBundle from "express-prom-bundle";
import { Counter, Gauge } from "prom-client";
import dotenv from "dotenv";
import authRoutes from "@/routes/auth";
import profileRoutes from "@/routes/profile";
import { setupSwagger } from "@config/swagger";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
app.use(express.json());

// Database connection
const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASS!,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
  },
);

// Prometheus middleware
const metricsMiddleware = promBundle({
  includeMethod: true,
  includePath: true,
  includeStatusCode: true,
  includeUp: true,
  customLabels: { project_name: "user_service" },
  promClient: {
    collectDefaultMetrics: {},
  },
});

app.use(metricsMiddleware);

// Custom metrics
export const userRegistrations = new Counter({
  name: "user_registrations_total",
  help: "Total number of user registrations",
});

export const loginAttempts = new Counter({
  name: "login_attempts_total",
  help: "Total number of login attempts",
  labelNames: ["status"],
});

const dbConnections = new Gauge({
  name: "pg_stat_activity_count",
  help: "Number of active database connections",
});

// Routes
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

// Set up Swagger documentation
setupSwagger(app);

// Middleware to update DB connection count
const updateDBConnectionCount = async () => {
  try {
    const [results] = await sequelize.query(
      "SELECT count(*) FROM pg_stat_activity",
    );
    const count = (results as any[])[0].count;
    dbConnections.set(Number(count));
  } catch (error) {
    console.error("Error updating DB connection count:", error);
  }
};

// Update DB connection count every 5 seconds
setInterval(updateDBConnectionCount, 5000);

// Error handling middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});

export default app;
