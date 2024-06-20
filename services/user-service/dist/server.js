"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const auth_1 = __importDefault(require("./routes/auth"));
const profile_1 = __importDefault(require("./routes/profile"));
const swagger_1 = require("@config/swagger");
const logger_1 = __importDefault(require("./config/logger"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/auth", auth_1.default);
app.use("/api/profile", profile_1.default);
(0, swagger_1.setupSwagger)(app);
// Error handling middleware with explicit types
app.use((err, _req, res, _next) => {
    logger_1.default.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});
const startServer = async () => {
    try {
        await db_1.default.sync({ force: process.env.NODE_ENV === "development" });
        logger_1.default.info("Database & tables created successfully!");
        const port = process.env.PORT || 3001;
        app.listen(port, () => {
            logger_1.default.info(`User Service running on port ${port}`);
        });
    }
    catch (error) {
        logger_1.default.error("Unable to start server:", error);
        process.exit(1);
    }
};
exports.startServer = startServer;
if (require.main === module) {
    (0, exports.startServer)()
        .then(() => logger_1.default.info("Server started successfully"))
        .catch((error) => {
        logger_1.default.error("Error starting server:", error);
        process.exit(1);
    });
}
exports.default = app;
