'use strict';

// Import modules for file and directory operations
const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');
const { execSync } = require('child_process');

// Check if the script was run with the '--moveHusky' flag and if the flag value is 'true'
const moveHusky = process.argv.includes('--moveHusky') && process.argv.includes('true');

// Main function to modify Husky hooks (move hooks to a new directory)
async function huskyMod(dir = 'husky_mod') {
  // Get the name of the current directory (project name)
  const projectDirName = path.basename(__dirname);
  // Define the source directory where Husky hooks are located
  const srcDir = `.husky`;
  // Define the destination directory to which the Husky hooks will be moved
  const destDir = `../${dir}/${projectDirName}`;

  // Ensure the destination directory exists
  fse.ensureDirSync(destDir, {});

  try {
    // Create the commit-msg hook file in the source directory
    fse.createFileSync(`${srcDir}/commit-msg`);
    // Write content to the commit-msg hook file
    fs.writeFileSync(`${srcDir}/commit-msg`, getCommitMsgContent(), {});
  } catch (e) {
    // Log an error if there's an issue creating or writing to the commit-msg hook file
    console.error(`Error writing commit-msg hook: ${e.message}`);
    throw e;
  }

  try {
    // Create the pre-commit hook file in the source directory
    fse.createFileSync(`${srcDir}/pre-commit`);
    // Write content to the pre-commit hook file
    fs.writeFileSync(`${srcDir}/pre-commit`, getPreCommitContent(), {});
    // Make the pre-commit hook file executable
    fs.chmodSync(`${srcDir}/pre-commit`, '755');
  } catch (e) {
    // Log an error if there's an issue creating or writing to the pre-commit hook file
    console.error(`Error writing pre-commit hook: ${e.message}`);
    throw e;
  }
}

// Function to get the content for the pre-commit hook
function getPreCommitContent() {
  return `#!/bin/bash

PROCESS_DIR="$(pwd)"
DIR_HELPER=$(dirname "$0")
REAL_HUSKY_MOD_PROJECT_DIR=$(realpath "$DIR_HELPER")
PROJECT_NAME=$(basename $(realpath "$REAL_HUSKY_MOD_PROJECT_DIR/../"))
REAL_PROJECT_DIR=$(realpath "$REAL_HUSKY_MOD_PROJECT_DIR/../../$PROJECT_NAME")

echo "[husky-mod] Parsing Husky version from package.json..."
echo "[husky-mod] REAL_PROJECT_DIR: $REAL_PROJECT_DIR"
echo

command -v jq >/dev/null 2>&1 || {
  echo "jq is not installed. Please install jq before running this script."
  echo
  exit 1
}

HUSKY_MAJOR_VERSION=$(jq -r '.dependencies.husky // .devDependencies.husky' "$REAL_PROJECT_DIR/package.json" | sed 's/^[\\^~]//')
HUSKY_MAJOR_VERSION_IN_NODE_MODULES=$(jq -r '.version' "$REAL_PROJECT_DIR/node_modules/husky/package.json" | sed 's/^[\\^~]//')

echo "[husky-mod] HUSKY_MAJOR_VERSION: $HUSKY_MAJOR_VERSION"
echo "[husky-mod] HUSKY_MAJOR_VERSION_IN_NODE_MODULES: $HUSKY_MAJOR_VERSION_IN_NODE_MODULES"
echo

if [ -z "$HUSKY_MAJOR_VERSION" ] || [ -z "$HUSKY_MAJOR_VERSION_IN_NODE_MODULES" ]; then
  echo "[husky-mod] Error: Unable to parse Husky version from package.json or node_modules."
  echo
  exit 1
fi

version_gt() {
  [ "$(printf '%s\\n' "$2" "$1" | sort -V | head -n1)" = "$1" ]
}

if version_gt "$HUSKY_MAJOR_VERSION_IN_NODE_MODULES" "$HUSKY_MAJOR_VERSION"; then
  echo "[husky-mod] Husky major versions are compatible: $HUSKY_MAJOR_VERSION_IN_NODE_MODULES >= $HUSKY_MAJOR_VERSION"
  echo
else
  echo "[husky-mod] Husky major versions do not match: $HUSKY_MAJOR_VERSION_IN_NODE_MODULES <> $HUSKY_MAJOR_VERSION"
  echo "[husky-mod] You have to reinstall it using 'npm install'"
  echo
  exit 1
fi

echo "[husky-mod] PROCESS_DIR: $PROCESS_DIR"
echo "[husky-mod] REAL_PROJECT_DIR: $REAL_PROJECT_DIR"
echo
echo "[husky-mod] PROJECT_NAME: $PROJECT_NAME"
echo

echo "[husky-mod] Checking branch name..."
echo

current_branch=$(git rev-parse --abbrev-ref HEAD)

# Extract the part after 'feature-'
branch_suffix="\${current_branch#feature-}"

# Check if the branch name follows the convention
if [[ "$current_branch" =~ ^feature- && "$branch_suffix" =~ ^[a-zA-Z_]+$ && \${#branch_suffix} -le 30 ]]; then
  echo "[husky-mod] Branch name '$current_branch' follows the convention."
  echo
else
  echo "[husky-mod] Error: Branch name '$current_branch' does not follow the convention."
  echo "[husky-mod] The part after 'feature-' ('$branch_suffix') must only contain letters and '_' and be at most 30 characters long. Commit aborted."
  echo
  exit 1
fi

echo "[husky-mod] Checking for test files..."

if find ./projects -name "*.spec.ts" | grep -q .; then
  echo "[husky-mod] Running tests before commit..."
  echo
  npx ng test --watch=false

  if [ $? -ne 0 ]; then
    echo "[husky-mod] Tests failed. Commit aborted."
    echo
    exit 1
  fi
else
  echo "[husky-mod] No test files found. Skipping tests."
  echo
fi

npx lint-staged
`;
}

// Function to get the content for the commit-msg hook
function getCommitMsgContent() {
  return `npx --no-install commitlint --edit "$1"`;
}

// Run the huskyMod function
huskyMod().then();
