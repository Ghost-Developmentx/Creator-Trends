const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

// ----- Configuration -----

const BUILD_DIRECTORY = path.resolve(__dirname, "dist");

const REQUIRED_FILES = [
  "server.js",
  "../config/config.js",
  "../docs/swagger.yaml",
];

const REQUIRED_ENV_VARS = [
  "DB_HOST",
  "DB_USER",
  "DB_PASS",
  "DB_NAME",
  "PORT",
  "JWT_SECRET",
];

const ENV_FILES = [".env", ".env.docker", ".env.test", ".env.production"];

// ----- Utility Functions -----

/**
 * Loads environment variables from specified files.
 * @param {string[]} envFiles - Array of environment file names.
 */
function loadEnvFiles(envFiles) {
  envFiles.forEach((file) => {
    const filePath = path.resolve(__dirname, file);
    if (fs.existsSync(filePath)) {
      dotenv.config({ path: filePath });
      console.log(`Loaded environment variables from ${file}`);
    } else {
      console.warn(`Warning: Environment file ${file} not found.`);
    }
  });
}

/**
 * Checks if a file exists.
 * @param {string} filePath - Path to the file.
 * @returns {boolean} - True if the file exists, otherwise false.
 */
function checkFile(filePath) {
  const absolutePath = path.resolve(BUILD_DIRECTORY, filePath);
  if (!fs.existsSync(absolutePath)) {
    console.error(`Error: Missing file - ${absolutePath}`);
    return false;
  }
  console.log(`File exists: ${absolutePath}`);
  return true;
}

/**
 * Checks if an environment variable is set.
 * @param {string} envVar - The name of the environment variable.
 * @returns {boolean} - True if the environment variable is set, otherwise false.
 */
function checkEnvVar(envVar) {
  if (!process.env[envVar]) {
    console.error(`Error: Missing environment variable - ${envVar}`);
    return false;
  }
  console.log(`Environment variable set: ${envVar}`);
  return true;
}

// ----- Main Function -----

/**
 * Verifies that the required files and environment variables are present.
 */
function verifyBuild() {
  console.log("Starting build verification...");
  loadEnvFiles(ENV_FILES);

  const allFilesValid = REQUIRED_FILES.every(checkFile);
  const allEnvVarsValid = REQUIRED_ENV_VARS.every(checkEnvVar);

  if (allFilesValid && allEnvVarsValid) {
    console.log("Build verification completed successfully.");
    process.exit(0);
  } else {
    console.error("Build verification failed. Please check the errors above.");
    process.exit(1);
  }
}

verifyBuild();
