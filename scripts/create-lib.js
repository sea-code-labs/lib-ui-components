// Import the execSync function from the child_process module
const { execSync } = require('child_process');
// Import the fs module for file system operations
const fs = require('fs');
// Import the path module for handling file paths
const path = require('path');
// Retrieve the library name from the command-line arguments
const [, , name] = process.argv;

// Check if the library name was provided
if (!name) {
  // Display an error message if no library name is provided
  console.error('Please provide the name of the library.');
  // Exit the process with an error code 1
  process.exit(1);
}

try {
  // Execute the command to generate a new Angular library with specified options
  execSync(`ng generate library ${name} --project-root=projects/libs/${name}`, { stdio: 'inherit' });
  // Create the path to the angular.json file
  const angularJsonPath = path.join(process.cwd(), 'angular.json');
  // Read and parse the content of angular.json
  const angularJson = JSON.parse(fs.readFileSync(angularJsonPath, 'utf-8'));

  // Check if the library exists in angular.json
  if (angularJson.projects && angularJson.projects[name]) {
    // Add the path to the karma configuration file
    angularJson.projects[name].architect.test.options.karmaConfig = 'karma.conf.js';
    // Write the updated content back to angular.json
    fs.writeFileSync(angularJsonPath, JSON.stringify(angularJson, null, 2));
    // Display a message indicating the karma configuration was successfully added
    console.log(`Added karmaConfig to ${name} in angular.json`);
  } else {
    // Display an error message if the library was not found in angular.json
    console.error(`Library ${name} not found in angular.json`);
  }
} catch (error) {
  // Handle errors that occur during the process
  console.error('Error generating library or updating angular.json:', error.message);
  // Exit the process with an error code 1
  process.exit(1);
}
