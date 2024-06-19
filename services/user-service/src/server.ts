// services/user-service/src/server.ts
import express from "express";
import sequelize from "./config/db";
import authRoutes from "./routes/auth";
import { setupSwagger, swaggerDocument } from "./config/swagger";
import logger from "./config/logger";

const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);

// Setup Swagger
console.log("Setting up Swagger...");
setupSwagger(app);

// Debug route for Swagger spec
app.get("/swagger.json", (_req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerDocument);
});

const startServer = async () => {
  try {
    await sequelize.sync({ force: true });
    logger.info("Database & tables created successfully!");
    app.listen(3001, () => {
      logger.info("User Service running on port 3001");
    });
  } catch (error) {
    logger.error("Unable to start server:", error);
  }
};

startServer()
  .then(() => logger.info("Server started successfully"))
  .catch((error) => logger.error("Error starting server:", error));
