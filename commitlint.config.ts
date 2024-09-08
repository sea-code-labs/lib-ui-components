// @ts-nocheck
// Commitlint Configuration File
//
// Instructions:
// 1. **Purpose**: This configuration file extends the conventional commit linting rules
//    to ensure consistency in commit messages, particularly for projects that follow
//    specific JIRA ticket-based patterns and semantic versioning.
// 2. **Header Requirements**: The commit message header must include:
//    - A JIRA issue number in the format `SC-[number]`.
//    - A commit type such as `feat`, `fix`, `docs`, etc.
//    - A commit message, ending with a version number formatted as `X.X.X`.
// 3. **How to Use**: Commit messages will be linted based on these rules whenever a commit
//    is made, helping enforce consistency. This setup works with tools like Husky to automate checks.

module.exports = {
  // Extending the conventional commit linting rules for consistency
  extends: ['@commitlint/config-conventional'],

  // Defining custom linting rules to enforce project-specific commit message standards
  rules: {
    // Rule to enforce that the header includes a JIRA issue number, a type (feat, fix, etc.), and a message
    'header-match-pattern': [
      2, // Severity level (error)
      'always', // Always apply this rule
      /^SC-\d+\s(feat|fix|docs|style|refactor|test|chore):\s.+/, // Regex to validate the header format
    ],

    // Rule to enforce a version number in the format X.X.X (where X is a number up to 5 digits long)
    'version-format': [
      2, // Severity level (error)
      'always', // Always apply this rule
      /^[0-9]\.[0-9]\.[0-9]$/, // Regex to ensure the version format is valid
    ],

    // Rule to ensure the subject field of the commit is not empty
    'subject-empty': [2, 'always'],

    // Rule to ensure the type (feat, fix, etc.) is not empty
    'type-empty': [2, 'always'],
  },

  // Custom plugin for additional rules and validations
  plugins: [
    {
      rules: {
        // Custom rule to ensure the header follows a specific JIRA pattern and commit type
        'header-match-pattern': ({ header }) => {
          // Regex to validate JIRA issue number (SC-123) and commit type (feat, fix, etc.)
          const jiraAndTypeRegex = /^SC-\d+\s(feat|fix|docs|refactor|test):\s.+/;
          return [
            jiraAndTypeRegex.test(header), // Test the header against the regex
            'Header must contain a JIRA issue number starting with SC- followed by a type and description. \n' +
              'Example: SC-[number] [feat|fix|docs|refactor|test]: [message] [version].',
          ];
        },

        // Custom rule to enforce the version format at the end of the commit message
        'version-format': ({ header }) => {
          // Regex to check for a version number in the format X.X.X
          const versionRegex = /^[0-9]\.[0-9]\.[0-9]$/;
          // Trim the header to extract the last part, which should be the version
          const trimmedHeader = header.trim();
          const version = trimmedHeader.split(' ').pop();
          // Validate if the last part of the header is a valid version
          const hasVersion = versionRegex.test(version);
          return [
            hasVersion, // Return true if the version is valid
            'Commit message must end with a version number in the format X.X.X, where X can be up to 5 digits long.',
          ];
        },
      },
    },
  ],
};
