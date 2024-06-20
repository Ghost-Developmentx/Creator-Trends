import { Sequelize } from "sequelize";
import * as path from "path";
import * as dotenv from "dotenv";

// ----- Configuration -----

enum Environment {
  Development = "development",
  Docker = "docker",
  Production = "production",
}

const ENV_FILE_MAP: Record<Environment, string> = {
  // Using Record for type safety
  [Environment.Development]: ".env.local",
  [Environment.Docker]: ".env.docker",
  [Environment.Production]: ".env",
};

const env = (process.env.NODE_ENV as Environment) || Environment.Development;
const configPath = path.resolve(__dirname, "..", ENV_FILE_MAP[env]);

// ----- Environment Setup -----

dotenv.config({ path: configPath });
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required and not found in environment.");
}

// ----- Sequelize Instance -----

const loggingOption =
  process.env.SEQUELIZE_LOGGING === "true" ? console.log : false;

const sequelize = new Sequelize(databaseUrl, {
  dialect: "postgres",
  logging: loggingOption,
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log(
      "Connection to the database has been established successfully.",
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

export default sequelize;
