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
exports.initDatabase = void 0;
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
    [Environment.Development]: ".env.local",
    [Environment.Docker]: ".env.docker",
    [Environment.Production]: ".env",
    [Environment.Test]: ".env.test",
};
const env = process.env.NODE_ENV || Environment.Development;
const configPath = path.resolve(__dirname, "..", "..", ENV_FILE_MAP[env]);
console.log(`Loading environment variables from: ${configPath}`);
dotenv.config({ path: configPath });
const databaseUrl = process.env.DATABASE_URL;
console.log(`Loaded DATABASE_URL: ${databaseUrl}`);
if (!databaseUrl) {
    throw new Error("DATABASE_URL is required and not found in environment.");
}
const loggingOption = process.env.SEQUELIZE_LOGGING === "true" ? console.log : false;
const sequelize = new sequelize_1.Sequelize(databaseUrl, {
    dialect: "postgres",
    logging: loggingOption,
});
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const initDatabase = async () => {
    try {
        // Add a small delay to ensure the database is ready
        await delay(2000);
        await sequelize.authenticate();
        console.log("Connection to the database has been established successfully.");
        if (process.env.NODE_ENV === "test") {
            await sequelize.drop();
            console.log("All tables dropped.");
        }
        await sequelize.sync({ force: process.env.NODE_ENV === "test" });
        console.log("Database synchronized successfully.");
    }
    catch (error) {
        console.error("Unable to connect to the database:", error);
        throw error;
    }
};
exports.initDatabase = initDatabase;
exports.default = sequelize;
