const fs = require("fs");
const path = require("path");

/**
 * The environment variable determines the current execution environment.
 * It can be set via the command line argument.
 *
 * @type {string}
 */
const environment = process.argv[2];

if (!environment) {
  console.error(
    "Please specify an environment (docker, test, production, or development)",
  );
  process.exit(1);
}

/**
 * Represents the path or URL to the source environment file.
 *
 * @typedef {string} sourceEnvFile
 */
let sourceEnvFile;
switch (environment) {
  case "docker":
    sourceEnvFile = ".env.docker";
    break;
  case "test":
    sourceEnvFile = ".env.test";
    break;
  case "production":
    sourceEnvFile = ".env.production";
    break;
  case "development":
    sourceEnvFile = ".env.development";
    break;
  default:
    console.error(
      "Invalid environment. Use docker, test, production, or development",
    );
    process.exit(1);
}

/**
 * The sourceEnvPath variable represents the path of the source environment file.
 *
 * @type {string}
 * @name sourceEnvPath
 */
const sourceEnvPath = path.join(__dirname, sourceEnvFile);
/**
 * The file path of the destination environment file.
 *
 * @type {string}
 * @name destEnvPath
 * @example
 * // JavaScript
 * const destEnvPath = path.join(__dirname, ".env");
 *
 * // TypeScript
 * const destEnvPath: string = path.join(__dirname, ".env");
 */
const destEnvPath = path.join(__dirname, ".env");

// Check if the source environment file exists before copying
if (!fs.existsSync(sourceEnvPath)) {
  console.error(`Source environment file ${sourceEnvFile} does not exist.`);
  process.exit(1);
}

try {
  fs.copyFileSync(sourceEnvPath, destEnvPath);
  console.log(`Successfully switched to ${environment} environment`);
} catch (err) {
  console.error(`Error switching environment: ${err.message}`);
  process.exit(1);
}
