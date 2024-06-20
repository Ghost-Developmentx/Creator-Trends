const fs = require("fs");
const path = require("path");

// Define source and destination paths for docs and config files
const docsSrcFile = path.resolve(__dirname, "docs", "swagger.yaml");
const docsDestDir = path.resolve(__dirname, "dist", "docs");
const docsDestFile = path.join(docsDestDir, "swagger.yaml");

const configSrcFile = path.resolve(__dirname, "config", "config.js");
const configDestDir = path.resolve(__dirname, "dist", "config");
const configDestFile = path.join(configDestDir, "config.js");

const dbSrcFile = path.resolve(__dirname, "src", "config", "db.ts");
const dbDestDir = path.resolve(__dirname, "dist", "src", "config");
const dbDestFile = path.join(dbDestDir, "db.ts");

const authSrcFile = path.resolve(__dirname, "src", "routes", "auth.ts");
const authDestDir = path.resolve(__dirname, "dist", "src", "routes");
const authDestFile = path.join(authDestDir, "auth.ts");

const loggerSrcFile = path.resolve(__dirname, "src", "config", "logger.ts");
const loggerDestDir = path.resolve(__dirname, "dist", "src", "config");
const loggerDestFile = path.join(loggerDestDir, "logger.ts");

const userModelSrcFile = path.resolve(__dirname, "src", "models", "user.ts");
const userModelDestDir = path.resolve(__dirname, "dist", "src", "models");
const userModelDestFile = path.join(userModelDestDir, "user.ts");

const userTypesSrcFile = path.resolve(__dirname, "src", "types", "user.ts");
const userTypesDestDir = path.resolve(__dirname, "dist", "src", "types");
const userTypesDestFile = path.join(userTypesDestDir, "user.ts");

const testsSrcDir = path.resolve(__dirname, "src", "tests");
const testsDestDir = path.resolve(__dirname, "dist", "tests");

// Function to copy files
const copyFile = (src, destDir, dest) => {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  try {
    fs.copyFileSync(src, dest);
    console.log(`File copied successfully: ${path.basename(src)}`);
  } catch (error) {
    console.error(`Error copying file ${path.basename(src)}:`, error.message);
    process.exit(1);
  }
};

// Function to copy directories
const copyDirectory = (srcDir, destDir) => {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  fs.readdirSync(srcDir).forEach((file) => {
    const srcFile = path.join(srcDir, file);
    const destFile = path.join(destDir, file);

    if (fs.statSync(srcFile).isDirectory()) {
      copyDirectory(srcFile, destFile);
    } else {
      copyFile(srcFile, destDir, destFile);
    }
  });
};

copyFile(docsSrcFile, docsDestDir, docsDestFile);

copyFile(configSrcFile, configDestDir, configDestFile);

copyFile(dbSrcFile, dbDestDir, dbDestFile);

copyFile(authSrcFile, authDestDir, authDestFile);

copyFile(loggerSrcFile, loggerDestDir, loggerDestFile);

copyFile(userModelSrcFile, userModelDestDir, userModelDestFile);

copyFile(userTypesSrcFile, userTypesDestDir, userTypesDestFile);

copyDirectory(testsSrcDir, testsDestDir);
