module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma'),
    ],
    client: {
      jasmine: {
        failSpecWithNoExpectations: true,
        hideDisabled: true,
        verboseDeprecations: true,
      },
      clearContext: true,
    },
    jasmineHtmlReporter: {
      suppressAll: true,
    },
    coverageIstanbulReporter: {
      reports: ['html', 'lcovonly'],
      fixWebpackSourcePaths: true,
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['ChromeHeadlessNoSandbox'],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox',
          '--disable-translate',
          '--disable-extensions',
          '--disable-background-networking',
          '--remote-debugging-port=9222',
          '--disable-web-security',
        ],
      },
    },
    singleRun: true,
    autoWatch: false,
    restartOnFileChange: false,
  });
};
