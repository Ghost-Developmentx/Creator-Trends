const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const dotenv = require("dotenv");

// ----- Configuration -----

const BUILD_DIRECTORY = path.resolve(__dirname, "dist");

const REQUIRED_FILES = [
  {
    path: "server.js",
    checksum:
      "f4f537b0b09b17b5c7d2eb9c477a423e8cc47f16a0cb787f4f5109690adfb455",
  },
  {
    path: "config/config.js",
    checksum:
      "31442ca9254c25118307071991f3694c4f3467d74735f6cff3fdb9bd6a4c7f23",
  },
  {
    path: "docs/swagger.yaml",
    checksum:
      "2d575e9def66267d7117928480c423b438d536db57dfdcd4d7011158e5157fab",
  },
];

const REQUIRED_ENV_VARS = [
  "DB_HOST",
  "DB_USER",
  "DB_PASSWORD",
  "DB_NAME",
  "PORT",
  "JWT_SECRET",
];

const ENV_FILES = [".env", ".env.local", ".env.docker", ".env.test"];

// ----- Utility Functions -----

function loadEnvFiles(envFiles) {
  envFiles.forEach((file) => {
    const filePath = path.resolve(__dirname, file);
    if (fs.existsSync(filePath)) {
      dotenv.config({ path: filePath });
    } else {
      console.warn(`Warning: Environment file ${file} not found.`);
    }
  });
}

function generateChecksum(filePath) {
  try {
    const fileBuffer = fs.readFileSync(filePath);
    return crypto.createHash("sha256").update(fileBuffer).digest("hex");
  } catch (error) {
    console.error(`Error reading file ${filePath}: ${error.message}`);
    return null;
  }
}

// ----- Verification Logic -----

function checkFile(file) {
  const filePath = path.join(BUILD_DIRECTORY, file.path);
  if (!fs.existsSync(filePath)) {
    console.error(`Error: Missing file - ${filePath}`);
    return false;
  }

  const checksum = generateChecksum(filePath);
  if (!checksum) return false;

  if (checksum !== file.checksum) {
    console.error(
      `Error: Checksum mismatch for ${filePath}. Expected ${file.checksum}, got ${checksum}`,
    );
    return false;
  }

  console.log(`File exists and checksum valid: ${filePath}`);
  return true;
}

function checkEnvVar(envVar) {
  if (!process.env[envVar]) {
    console.error(`Error: Missing environment variable - ${envVar}`);
    return false;
  }
  console.log(`Environment variable set: ${envVar}`);
  return true;
}

// ----- Main Function -----

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
