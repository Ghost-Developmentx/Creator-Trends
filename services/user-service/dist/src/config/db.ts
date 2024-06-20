import { Sequelize } from "sequelize";
import * as path from "path";
import * as dotenv from "dotenv";

enum Environment {
  Development = "development",
  Docker = "docker",
  Production = "production",
  Test = "test",
}

const ENV_FILE_MAP: Record<Environment, string> = {
  [Environment.Development]: ".env.local",
  [Environment.Docker]: ".env.docker",
  [Environment.Production]: ".env",
  [Environment.Test]: ".env.test",
};

const env = (process.env.NODE_ENV as Environment) || Environment.Development;
const configPath = path.resolve(__dirname, "..", "..", ENV_FILE_MAP[env]);

console.log(`Loading environment variables from: ${configPath}`);
dotenv.config({ path: configPath });

const databaseUrl = process.env.DATABASE_URL;
console.log(`Loaded DATABASE_URL: ${databaseUrl}`);

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required and not found in environment.");
}

const loggingOption =
  process.env.SEQUELIZE_LOGGING === "true" ? console.log : false;

const sequelize = new Sequelize(databaseUrl, {
  dialect: "postgres",
  logging: loggingOption,
});

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const initDatabase = async () => {
  try {
    // Add a small delay to ensure the database is ready
    await delay(2000);

    await sequelize.authenticate();
    console.log(
      "Connection to the database has been established successfully.",
    );

    if (process.env.NODE_ENV === "test") {
      await sequelize.drop();
      console.log("All tables dropped.");
    }

    await sequelize.sync({ force: process.env.NODE_ENV === "test" });
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    throw error;
  }
};

export default sequelize;
