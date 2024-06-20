import * as dotenv from "dotenv";
import * as path from "path";
import * as bcrypt from "bcrypt";
import User from "./src/models/user";
import { initDatabase } from "./src/config/db";

dotenv.config({ path: path.resolve(__dirname, ".env.test") });

declare global {
  function setupTestUser(): Promise<void>;
}

global.setupTestUser = async () => {
  const existingUser = await User.findOne({
    where: { email: "test@example.com" },
  });
  if (!existingUser) {
    const hashedPassword = await bcrypt.hash("testpassword", 10);
    await User.create({
      email: "test@example.com",
      password: hashedPassword,
    });
    console.log("Test user created");
  } else {
    console.log("Test user already exists");
  }
};

beforeAll(async () => {
  try {
    await initDatabase();
    console.log("Test database initialized");
  } catch (error) {
    console.error("Error initializing test database:", error);
    process.exit(1);
  }
});

afterAll(async () => {
  const sequelize = (await import("./src/config/db")).default;
  await sequelize.close();
  console.log("Database connection closed");
});
