"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDatabase = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const path = __importStar(require("path"));
const dotenv = __importStar(require("dotenv"));
var Environment;
(function (Environment) {
    Environment["Development"] = "development";
    Environment["Docker"] = "docker";
    Environment["Production"] = "production";
    Environment["Test"] = "test";
})(Environment || (Environment = {}));
const ENV_FILE_MAP = {
    [Environment.Development]: ".env",
    [Environment.Docker]: ".env.docker",
    [Environment.Production]: ".env.production",
    [Environment.Test]: ".env.test",
};
const env = process.env.NODE_ENV || Environment.Development;
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
exports.sequelize = new sequelize_1.Sequelize(databaseUrl, {
    dialect: "postgres",
    logging: (msg) => console.log(`[Sequelize] ${msg}`),
});
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const initDatabase = async (retries = 5, interval = 5000) => {
    for (let i = 0; i < retries; i++) {
        try {
            console.log(`Attempt ${i + 1} to connect to the database...`);
            await exports.sequelize.authenticate();
            console.log("Database connection has been established successfully.");
            if (env === Environment.Test) {
                await exports.sequelize.drop();
                console.log("All tables dropped for test environment.");
            }
            await exports.sequelize.sync({ force: env === Environment.Test });
            console.log("Database synced and tables created successfully!");
            return;
        }
        catch (error) {
            console.error("Unable to connect to the database:", error);
            if (i < retries - 1) {
                console.log(`Retrying in ${interval / 1000} seconds...`);
                await delay(interval);
            }
        }
    }
    throw new Error("Failed to connect to the database after multiple attempts");
};
exports.initDatabase = initDatabase;
