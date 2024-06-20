// Import necessary libraries
const { config } = require("dotenv");
const path = require("path");
const fs = require("fs");

// Load environment variables from .env files
const envFiles = [".env", ".env.local", ".env.docker"];
envFiles.forEach((file) => {
  const filePath = path.resolve(__dirname, file);
  if (fs.existsSync(filePath)) {
    const result = config({ path: filePath });
    if (result.error) {
      console.warn(`Warning: Could not load environment file ${filePath}`);
    } else {
      console.log(`Loaded environment variables from ${filePath}`);
    }
  } else {
    console.warn(`Warning: Environment file ${filePath} does not exist.`);
  }
});

// Global setup for node-fetch
global.fetch = require("node-fetch");

// Setup database for testing
const sequelize = require("./src/config/db").default;

// Define a global variable to store the transaction
let transaction;

// Before all tests
beforeAll(async () => {
  try {
    await sequelize.sync({ force: true }); // Sync and reset the database
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Error setting up the database for tests:", error);
  }
});

// Before each test
beforeEach(async () => {
  try {
    transaction = await sequelize.transaction(); // Start a new transaction
  } catch (error) {
    console.error("Error starting a transaction for tests:", error);
  }
});

// After each test
afterEach(async () => {
  try {
    await transaction.rollback(); // Rollback the transaction
    console.log("Transaction rolled back.");
  } catch (error) {
    console.error("Error rolling back transaction:", error);
  }
});

// After all tests
afterAll(async () => {
  try {
    await sequelize.close(); // Close the database connection
    console.log("Database connection closed.");
  } catch (error) {
    console.error("Error closing the database connection:", error);
  }
});
// Add any global variables or mocks that your tests need
global.testUser = {
  email: "test@example.com",
  password: "password123",
};

// Mock any external services or APIs if necessary
jest.mock("node-fetch", () => {
  return jest.fn(() => Promise.resolve({ json: () => Promise.resolve({}) }));
});
