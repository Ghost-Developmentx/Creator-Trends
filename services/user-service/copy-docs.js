const fs = require("fs");
const path = require("path");

const DIST_DIR = path.resolve(__dirname, "dist");

const filesToCopy = [
  { src: "docs/swagger.yaml", dest: "docs/swagger.yaml" },
  { src: "config/config.js", dest: "config/config.js" },
  { src: "src/config/db.ts", dest: "src/config/db.ts" },
  { src: "src/config/swagger.ts", dest: "src/config/swagger.ts" },
  { src: "docs/swagger.yaml", dest: "src/docs/swagger.yaml" },
  {
    src: "src/constants/http-status-codes.ts",
    dest: "src/constants/http-status-codes.ts",
  },
  {
    src: "src/validators/profileValidators.ts",
    dest: "src/validators/profileValidators.ts",
  },
  {
    src: "src/validators/authValidators.ts",
    dest: "src/validators/authValidators.ts",
  }, // Added authValidators
  { src: "src/utils/errorHandlers.ts", dest: "src/utils/errorHandlers.ts" },
  { src: "src/routes/auth.ts", dest: "src/routes/auth.ts" },
  { src: "src/routes/profile.ts", dest: "src/routes/profile.ts" },
  { src: "src/config/logger.ts", dest: "src/config/logger.ts" },
  { src: "src/models/user.ts", dest: "src/models/user.ts" },
  { src: "src/types/user.ts", dest: "src/types/user.ts" },
  {
    src: "src/controllers/authController.ts",
    dest: "src/controllers/authController.ts",
  },
  {
    src: "src/controllers/profileController.ts",
    dest: "src/controllers/profileController.ts",
  },
  { src: "src/services/authService.ts", dest: "src/services/authService.ts" },
  {
    src: "src/services/profileService.ts",
    dest: "src/services/profileService.ts",
  },
  { src: "jest.config.ts", dest: "jest.config.ts" },
  { src: "jest.setup.ts", dest: "jest.setup.ts" },
  { src: "global.d.ts", dest: "global.d.ts" },
  { src: "jest.global-setup.ts", dest: "jest.global-setup.ts" },
  { src: "jest.global-teardown.ts", dest: "jest.global-teardown.ts" },
  // Add this line to copy server.ts
  { src: "src/server.ts", dest: "src/server.ts" },
];

function ensureDirectoryExistence(filePath) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

function copyFile(src, dest) {
  const srcPath = path.resolve(__dirname, src);
  const destPath = path.resolve(DIST_DIR, dest);

  ensureDirectoryExistence(destPath);

  try {
    fs.copyFileSync(srcPath, destPath);
    console.log(`File copied successfully: ${src}`);
  } catch (error) {
    console.error(`Error copying file ${src}:`, error.message);
    process.exit(1);
  }
}

function copyFiles() {
  filesToCopy.forEach((file) => copyFile(file.src, file.dest));
}

copyFiles();
