require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASS || "8911023",
    database: process.env.DB_NAME || "creator_trends_user_service_dev",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5433,
    dialect: "postgres",
  },
  test: {
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASS || "8911023",
    database: process.env.DB_NAME || "creator_trends_test",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5433,
    dialect: "postgres",
  },
  production: {
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASS || "8911023",
    database: process.env.DB_NAME || "creator_trends_user_service_prod",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5433,
    dialect: "postgres",
  },
  docker: {
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASS || "8911023",
    database: process.env.DB_NAME || "creator_trends_user_service_docker",
    host: process.env.DB_HOST || "db",
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
  },
};
