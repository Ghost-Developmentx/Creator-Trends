import swaggerUi from "swagger-ui-express";
import { Application } from "express";
import fs from "fs";
import yaml from "js-yaml";
import path from "path";

// Update the path to point to the correct location in the Docker container
const yamlFilePath = path.join(__dirname, "../docs/swagger.yaml");

// Read and parse the YAML file
const swaggerDocument = yaml.load(
  fs.readFileSync(yamlFilePath, "utf8"),
) as Record<string, any>;

const setupSwagger = (app: Application) => {
  // Serve the Swagger UI and the YAML file
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.get("/swagger.json", (_req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerDocument);
  });
};

export { swaggerDocument, setupSwagger };
