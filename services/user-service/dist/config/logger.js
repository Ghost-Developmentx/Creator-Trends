"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const path_1 = __importDefault(require("path"));
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const fs_1 = __importDefault(require("fs"));
// ----- Configuration -----
const LOG_DIR = process.env.LOG_DIR || path_1.default.join(__dirname, "../../logs");
const LOG_LEVEL = process.env.LOG_LEVEL || "info";
const SERVICE_NAME = process.env.SERVICE_NAME || "user-service";
const IS_PRODUCTION = process.env.NODE_ENV === "production";
// ----- Logger Configuration -----
const logger = (0, winston_1.createLogger)({
    level: LOG_LEVEL,
    format: winston_1.format.combine(winston_1.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), winston_1.format.errors({ stack: true }), winston_1.format.splat(), winston_1.format.json()),
    defaultMeta: { service: SERVICE_NAME },
    transports: [
        new winston_daily_rotate_file_1.default({
            filename: path_1.default.join(LOG_DIR, "error-%DATE%.log"),
            datePattern: "YYYY-MM-DD",
            level: "error",
            maxFiles: "14d",
            zippedArchive: true,
        }),
        new winston_daily_rotate_file_1.default({
            filename: path_1.default.join(LOG_DIR, "combined-%DATE%.log"),
            datePattern: "YYYY-MM-DD",
            maxFiles: "14d",
            zippedArchive: true,
        }),
    ],
});
// ----- Conditional Console Transport -----
if (!IS_PRODUCTION) {
    logger.add(new winston_1.transports.Console({
        format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.simple()),
    }));
}
// ----- Ensure Log Directory Exists -----
ensureLogDirectoryExists();
// ----- Utility Functions -----
function ensureLogDirectoryExists() {
    try {
        fs_1.default.mkdirSync(LOG_DIR, { recursive: true });
    }
    catch (error) {
        logger.error("Error creating log directory:", error);
        process.exit(1);
    }
}
// ----- Export -----
exports.default = logger;
