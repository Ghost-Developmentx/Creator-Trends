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
  [Environment.Development]: ".env",
  [Environment.Docker]: ".env.docker",
  [Environment.Production]: ".env.production",
  [Environment.Test]: ".env.test",
};

const env = (process.env.NODE_ENV as Environment) || Environment.Development;
const configPath = path.resolve(__dirname, "..", "..", ENV_FILE_MAP[env]);

console.log(`Current NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`Resolved environment: ${env}`);
console.log(`Loading environment variables from: ${configPath}`);
dotenv.config({ path: configPath });

const databaseUrl = process.env.DATABASE_URL;
console.log(`Loaded DATABASE_URL: ${databaseUrl}`);

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required and not found in environment.");
}

export const sequelize = new Sequelize(databaseUrl, {
  dialect: "postgres",
  logging: (msg) => console.log(`[Sequelize] ${msg}`),
});

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const initDatabase = async (retries = 5, interval = 5000) => {
  for (let i = 0; i < retries; i++) {
    try {
      console.log(`Attempt ${i + 1} to connect to the database...`);
      await sequelize.authenticate();
      console.log("Database connection has been established successfully.");

      if (env === Environment.Test) {
        await sequelize.drop();
        console.log("All tables dropped for test environment.");
      }

      await sequelize.sync({ force: env === Environment.Test });
      console.log("Database synced and tables created successfully!");
      return;
    } catch (error) {
      console.error("Unable to connect to the database:", error);
      if (i < retries - 1) {
        console.log(`Retrying in ${interval / 1000} seconds...`);
        await delay(interval);
      }
    }
  }
  throw new Error("Failed to connect to the database after multiple attempts");
};
