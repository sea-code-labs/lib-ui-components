const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Path to the projects directory
const libsPath = path.join(__dirname, '..', 'projects', 'libs');

// Function to get all directories inside the libs folder
function getLibDirectories(basePath) {
  return fs.readdirSync(basePath).filter((file) => {
    const filePath = path.join(basePath, file);
    return fs.statSync(filePath).isDirectory();
  });
}

// Function to build each library
function buildLibraries() {
  const libraries = getLibDirectories(libsPath);
  libraries.forEach((lib) => {
    console.log(`Building ${lib}...`);
    execSync(`ng build ${lib} --configuration production`, { stdio: 'inherit' });
  });
}

buildLibraries();
