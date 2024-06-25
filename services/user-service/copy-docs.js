const fs = require("fs");
const path = require("path");

const DIST_DIR = path.resolve(__dirname, "dist");

const filesToCopy = [
  { src: "docs/swagger.yaml", dest: "docs/swagger.yaml" },
  { src: "config/config.js", dest: "config/config.js" },
  { src: "migrations", dest: "migrations" },
];

/**
 * Ensures that the directory exists. If the directory structure does not exist, it is created.
 * @param {string} filePath - The path of the directory.
 */
function ensureDirectoryExistence(filePath) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

/**
 * Copies a file or directory from the source path to the destination path.
 * @param {string} src - The source file or directory path.
 * @param {string} dest - The destination file or directory path.
 */
function copyFileOrDirectory(src, dest) {
  const srcPath = path.resolve(__dirname, src);
  const destPath = path.resolve(DIST_DIR, dest);

  ensureDirectoryExistence(destPath);

  try {
    if (fs.lstatSync(srcPath).isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true });
      fs.readdirSync(srcPath).forEach((file) => {
        copyFileOrDirectory(path.join(src, file), path.join(dest, file));
      });
    } else {
      fs.copyFileSync(srcPath, destPath);
      console.log(`File copied successfully: ${srcPath} to ${destPath}`);
    }
  } catch (error) {
    console.error(
      `Error copying file or directory ${srcPath} to ${destPath}:`,
      error.message,
    );
    process.exit(1);
  }
}

/**
 * Copies all specified files and directories to the destination directory.
 */
function copyFiles() {
  filesToCopy.forEach((file) => copyFileOrDirectory(file.src, file.dest));
}

copyFiles();
