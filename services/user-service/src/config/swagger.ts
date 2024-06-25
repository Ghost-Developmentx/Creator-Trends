import swaggerUi from "swagger-ui-express";
import { Application } from "express";
import fs from "fs";
import yaml from "js-yaml";
import path from "path";

// Define the path to your YAML file
const yamlFilePath = path.join(__dirname, "..", "..", "docs", "swagger.yaml");

let swaggerDocument: Record<string, any> = {};

try {
  // Read and parse the YAML file
  swaggerDocument = yaml.load(fs.readFileSync(yamlFilePath, "utf8")) as Record<
    string,
    any
  >;
} catch (error) {
  console.warn(
    "Warning: Swagger YAML file not found or invalid. Swagger UI will not be available.",
  );
}

const setupSwagger = (app: Application) => {
  if (Object.keys(swaggerDocument).length > 0) {
    // Serve the Swagger UI and the YAML file
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    app.get("/swagger.json", (_req, res) => {
      res.setHeader("Content-Type", "application/json");
      res.send(swaggerDocument);
    });
  }
};

export { swaggerDocument, setupSwagger };
