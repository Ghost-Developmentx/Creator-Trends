// services/user-service/src/config/logger.ts

import { createLogger, format, transports } from "winston";
import path from "path";
import DailyRotateFile from "winston-daily-rotate-file";

// Logger configuration
const logger = createLogger({
  level: "info", // Default log level
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), // Timestamp format
    format.errors({ stack: true }), // Include stack trace for errors
    format.splat(), // Enables string interpolation
    format.json(), // Log as JSON
  ),
  defaultMeta: { service: "user-service" }, // Metadata for logs
  transports: [
    new DailyRotateFile({
      filename: path.join(__dirname, "../../logs/error-%DATE%.log"), // Error logs with date rotation
      datePattern: "YYYY-MM-DD", // Date pattern for log files
      level: "error", // Log level
      maxFiles: "14d", // Keep logs for 14 days
    }),
    new DailyRotateFile({
      filename: path.join(__dirname, "../../logs/combined-%DATE%.log"), // Combined logs with date rotation
      datePattern: "YYYY-MM-DD", // Date pattern for log files
      maxFiles: "14d", // Keep logs for 14 days
    }),
  ],
});

// Add console transport in development mode
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.combine(
        format.colorize(), // Colorize logs for better readability
        format.simple(), // Simple format for console output
      ),
    }),
  );
}

export default logger;
