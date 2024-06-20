import { initDatabase } from "./src/config/db";

module.exports = async () => {
  await initDatabase();
  console.log("Global setup: Database initialized");
};
