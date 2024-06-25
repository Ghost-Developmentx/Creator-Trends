import { createLogger, format, transports } from "winston";
import path from "path";
import DailyRotateFile from "winston-daily-rotate-file";
import fs from "fs";

// ----- Configuration -----

const LOG_DIR = process.env.LOG_DIR || path.join(__dirname, "../../logs");
const LOG_LEVEL = process.env.LOG_LEVEL || "info";
const SERVICE_NAME = process.env.SERVICE_NAME || "user-service";
const IS_PRODUCTION = process.env.NODE_ENV === "production";

// Ensure log directory exists before creating logger
ensureLogDirectoryExists();

// ----- Logger Configuration -----

const logger = createLogger({
  level: LOG_LEVEL,
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
  ),
  defaultMeta: { service: SERVICE_NAME },
  transports: [
    new DailyRotateFile({
      filename: path.join(LOG_DIR, "error-%DATE%.log"),
      datePattern: "YYYY-MM-DD",
      level: "error",
      maxFiles: "14d",
      zippedArchive: true,
    }),
    new DailyRotateFile({
      filename: path.join(LOG_DIR, "combined-%DATE%.log"),
      datePattern: "YYYY-MM-DD",
      maxFiles: "14d",
      zippedArchive: true,
    }),
  ],
});

// ----- Conditional Console Transport -----

if (!IS_PRODUCTION) {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    }),
  );
}

// ----- Utility Functions -----

/**
 * Ensure the log directory exists.
 * Creates the directory if it doesn't exist.
 */
function ensureLogDirectoryExists() {
  if (!fs.existsSync(LOG_DIR)) {
    try {
      fs.mkdirSync(LOG_DIR, { recursive: true });
    } catch (error) {
      console.error("Error creating log directory:", error);
      process.exit(1);
    }
  }
}

// ----- Export -----

export default logger;
