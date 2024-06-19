const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

// Function to load environment variables from multiple .env files
function loadEnv(files) {
  files.forEach((file) => {
    const filePath = path.resolve(__dirname, file);
    if (fs.existsSync(filePath)) {
      const envConfig = require("dotenv").parse(fs.readFileSync(filePath));
      for (const key in envConfig) {
        if (Object.prototype.hasOwnProperty.call(envConfig, key)) {
          process.env[key] = envConfig[key];
        }
      }
    } else {
      console.warn(`Warning: ${file} not found.`);
    }
  });
}

// Load environment variables from .env, .env.local, and .env.docker
loadEnv([".env", ".env.local", ".env.docker"]);

// Paths to important files and directories
const requiredFiles = [
  {
    path: path.join(__dirname, "dist", "server.js"),
    checksum:
      "caa005f3ff3e9810ec16efe8d8572fe5d2846620820fc6da606cd1a3dde264ad", // Replace with actual checksum value
  },
  {
    path: path.join(__dirname, "dist", "config", "config.js"),
    checksum:
      "31442ca9254c25118307071991f3694c4f3467d74735f6cff3fdb9bd6a4c7f23", // Replace with actual checksum value
  },
  {
    path: path.join(__dirname, "dist", "docs", "swagger.yaml"),
    checksum:
      "2d575e9def66267d7117928480c423b438d536db57dfdcd4d7011158e5157fab", // Replace with actual checksum value
  },
];

// Environment variables that need to be checked
const requiredEnvVars = [
  "DB_HOST",
  "DB_USER",
  "DB_PASSWORD",
  "DB_NAME",
  "PORT",
  "JWT_SECRET",
];

// Function to check if required files exist and validate checksum
function checkFiles() {
  let allFilesExist = true;

  requiredFiles.forEach((file) => {
    if (!fs.existsSync(file.path)) {
      console.error(`Error: Missing file - ${file.path}`);
      allFilesExist = false;
    } else {
      console.log(`File exists: ${file.path}`);
      const checksum = generateChecksum(file.path);
      if (checksum !== file.checksum) {
        console.error(
          `Error: Checksum mismatch for ${file.path}. Expected ${file.checksum}, got ${checksum}`,
        );
        allFilesExist = false;
      } else {
        console.log(`Checksum valid for ${file.path}`);
      }
    }
  });

  return allFilesExist;
}

// Function to generate a checksum for a file
function generateChecksum(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  const hash = crypto.createHash("sha256");
  hash.update(fileBuffer);
  return hash.digest("hex");
}

// Function to check if environment variables are set
function checkEnvVars() {
  let allVarsSet = true;

  requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
      console.error(`Error: Missing environment variable - ${envVar}`);
      allVarsSet = false;
    } else {
      console.log(`Environment variable set: ${envVar}`);
    }
  });

  return allVarsSet;
}

// Main function to verify build
function verifyBuild() {
  console.log("Starting build verification...");

  const filesValid = checkFiles();
  const envVarsValid = checkEnvVars();

  if (filesValid && envVarsValid) {
    console.log("Build verification completed successfully.");
    process.exit(0); // Exit with success
  } else {
    console.error("Build verification failed. Please check the errors above.");
    process.exit(1); // Exit with failure
  }
}

// Run the verification
verifyBuild();
