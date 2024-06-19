// user-service/src/config/swaggerConfig.js

const swaggerJSDoc = require("swagger-jsdoc");
const fs = require("fs");

const options = {
  definition: {
    openapi: "3.0.0", // Specify the OpenAPI version
    info: {
      title: "User Service API",
      version: "1.0.0",
      description: "API documentation for the User Service",
    },
  },
  apis: [
    "G:/Ghost-Projects/Creator-Trends/services/user-service/src/routes/*.ts",
  ], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);

// Write the YAML file
fs.writeFileSync("./swagger.yaml", JSON.stringify(swaggerSpec, null, 2));
console.log("Swagger YAML file generated at ./swagger.yaml");
