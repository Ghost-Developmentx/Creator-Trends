const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

// ----- Configuration -----

/**
 * The path to the build directory.
 *
 * @type {string}
 * @constant
 *
 * @example
 * console.log(BUILD_DIRECTORY); // '/path/to/directory/dist'
 */
const BUILD_DIRECTORY = path.resolve(__dirname, "dist");
/**
 * An array representing the required files and their properties.
 * @typedef {Object} File
 * @property {string} path - The file path.
 * @property {string} checksum - The checksum value of the file.
 */
const REQUIRED_FILES = [
  {
    path: "server.js",
    checksum:
      "caa005f3ff3e9810ec16efe8d8572fe5d2846620820fc6da606cd1a3dde264ad",
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
/**
 * Array containing the names of the required environment variables.
 *
 * @type {string[]}
 */
const REQUIRED_ENV_VARS = [
  "DB_HOST",
  "DB_USER",
  "DB_PASSWORD",
  "DB_NAME",
  "PORT",
  "JWT_SECRET",
];
/**
 * An array of environment file names used for configuration.
 *
 * @type {string[]}
 */
const ENV_FILES = [".env", ".env.local", ".env.docker"];

// ----- Utility Functions -----

/**
 * Loads environment files.
 *
 * @param {string[]} envFiles - An array of environment file paths.
 */
function loadEnvFiles(envFiles) {
  envFiles.forEach((file) => {
    const filePath = path.resolve(__dirname, file);
    if (fs.existsSync(filePath)) {
      require("dotenv").config({ path: filePath });
    } else {
      console.warn(`Warning: Environment file ${file} not found.`);
    }
  });
}

/**
 * Generates the checksum for a given file.
 * @param {string} filePath - The path to the file.
 * @return {string} The hex string representing the checksum of the file.
 */
function generateChecksum(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  return crypto.createHash("sha256").update(fileBuffer).digest("hex");
}

// ----- Verification Logic -----

/**
 * Checks if a file exists and has a valid checksum.
 *
 * @param {object} file - The file object containing path and checksum properties.
 * @param {string} file.path - The relative path of the file.
 * @param {string} file.checksum - The expected checksum of the file.
 * @return {boolean} Returns true if the file exists and has a valid checksum, false otherwise.
 */
function checkFile(file) {
  const filePath = path.join(BUILD_DIRECTORY, file.path);
  if (!fs.existsSync(filePath)) {
    console.error(`Error: Missing file - ${filePath}`);
    return false;
  }

  const checksum = generateChecksum(filePath);
  if (checksum !== file.checksum) {
    console.error(
      `Error: Checksum mismatch for ${filePath}. Expected ${file.checksum}, got ${checksum}`,
    );
    return false;
  }

  console.log(`File exists and checksum valid: ${filePath}`);
  return true;
}

/**
 * Check if an environment variable is set.
 *
 * @param {string} envVar - The name of the environment variable.
 * @return {boolean} - True if the environment variable is set, false otherwise.
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
 * Starts the build verification process.
 *
 * @returns {undefined}
 */
function verifyBuild() {
  console.log("Starting build verification...");
  loadEnvFiles(ENV_FILES);

  const allFilesValid = REQUIRED_FILES.every(checkFile);
  const allEnvVarsValid = REQUIRED_ENV_VARS.every(checkEnvVar);

  if (allFilesValid && allEnvVarsValid) {
    console.log("Build verification completed successfully.");
    process.exit(0); // Exit with success
  } else {
    console.error("Build verification failed. Please check the errors above.");
    process.exit(1); // Exit with failure
  }
}

verifyBuild();
