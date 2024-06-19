const fs = require("fs");
const path = require("path");

const env = process.argv[2] || "local";
const envFile = `.env.${env}`;
const targetEnvFile = path.resolve(__dirname, ".env");

try {
  fs.copyFileSync(path.resolve(__dirname, envFile), targetEnvFile);
  console.log(`Successfully switched to ${env} environment`);
} catch (error) {
  console.error(`Failed to switch environment: ${error.message}`);
  process.exit(1);
}
