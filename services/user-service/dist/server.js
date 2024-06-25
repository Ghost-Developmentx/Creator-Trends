"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginAttempts = exports.userRegistrations = void 0;
require("module-alias/register");
const express_1 = __importDefault(require("express"));
const sequelize_1 = require("sequelize");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_prom_bundle_1 = __importDefault(require("express-prom-bundle"));
const prom_client_1 = require("prom-client");
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables
dotenv_1.default.config();
// Initialize Express app
const app = (0, express_1.default)();
app.use(express_1.default.json());
class User extends sequelize_1.Model {
}
// Database connection
const sequelize = new sequelize_1.Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: "postgres",
});
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: "User",
});
// Prometheus middleware
const metricsMiddleware = (0, express_prom_bundle_1.default)({
    includeMethod: true,
    includePath: true,
    includeStatusCode: true,
    includeUp: true,
    customLabels: { project_name: "user_service" },
    promClient: {
        collectDefaultMetrics: {},
    },
});
app.use(metricsMiddleware);
// Custom metrics
exports.userRegistrations = new prom_client_1.Counter({
    name: "user_registrations_total",
    help: "Total number of user registrations",
});
exports.loginAttempts = new prom_client_1.Counter({
    name: "login_attempts_total",
    help: "Total number of login attempts",
    labelNames: ["status"],
});
const dbConnections = new prom_client_1.Gauge({
    name: "pg_stat_activity_count",
    help: "Number of active database connections",
});
// Registration route
app.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ error: "User already exists" });
        }
        // Hash password
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        // Create new user
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });
        exports.userRegistrations.inc();
        res
            .status(201)
            .json({ message: "User registered successfully", userId: newUser.id });
    }
    catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
// Login route
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find user
        const user = await User.findOne({ where: { email } });
        if (!user) {
            exports.loginAttempts.inc({ status: "failure" });
            return res.status(401).json({ error: "Invalid credentials" });
        }
        // Check password
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            exports.loginAttempts.inc({ status: "failure" });
            return res.status(401).json({ error: "Invalid credentials" });
        }
        // Generate JWT
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        exports.loginAttempts.inc({ status: "success" });
        res.json({ message: "Login successful", token });
    }
    catch (error) {
        console.error("Login error:", error);
        exports.loginAttempts.inc({ status: "failure" });
        res.status(500).json({ error: "Internal server error" });
    }
});
// Middleware to update DB connection count
const updateDBConnectionCount = async () => {
    try {
        const [results] = await sequelize.query("SELECT count(*) FROM pg_stat_activity");
        const count = results[0].count;
        dbConnections.set(Number(count));
    }
    catch (error) {
        console.error("Error updating DB connection count:", error);
    }
};
// Update DB connection count every 5 seconds
setInterval(updateDBConnectionCount, 5000);
// Error handling middleware
app.use((err, _req, res, _next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});
// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connection has been established successfully.");
        console.log(`Server is running on port ${PORT}`);
    }
    catch (error) {
        console.error("Unable to connect to the database:", error);
    }
});
exports.default = app;
