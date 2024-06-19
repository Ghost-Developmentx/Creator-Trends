import { Sequelize } from "sequelize";
import { config } from "dotenv";
import path from "path";

// Load environment variables from the appropriate .env file
const envFile = process.env.IS_DOCKER === "true" ? ".env.docker" : ".env.local";
config({ path: path.resolve(__dirname, "..", envFile) });

const databaseUrl = process.env.DATABASE_URL;

// Check if DATABASE_URL is set
if (!databaseUrl) {
  throw new Error("DATABASE_URL environment variable not set.");
}

const sequelize = new Sequelize(databaseUrl, {
  dialect: "postgres",
  logging: process.env.SEQUELIZE_LOGGING === "true" ? console.log : false,
});

export default sequelize;
