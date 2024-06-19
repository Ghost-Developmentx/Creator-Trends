const fs = require("fs");
const path = require("path");

// Define source and destination paths
const docsSrcFile = path.resolve(__dirname, "docs", "swagger.yaml");
const docsDestDir = path.resolve(__dirname, "dist", "docs");
const docsDestFile = path.join(docsDestDir, "swagger.yaml");

const configSrcFile = path.resolve(__dirname, "config", "config.js");
const configDestDir = path.resolve(__dirname, "dist", "config");
const configDestFile = path.join(configDestDir, "config.js");

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

// Copy docs file
copyFile(docsSrcFile, docsDestDir, docsDestFile);

// Copy config file
copyFile(configSrcFile, configDestDir, configDestFile);
