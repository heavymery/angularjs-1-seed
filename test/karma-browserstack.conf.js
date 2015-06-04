// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2015-01-07 using
// generator-karma 0.8.3

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-cookies/angular-cookies.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/angular-touch/angular-touch.js',
      'bower_components/angular-mocks/angular-mocks.js',
      // endbower
      "app/scripts/**/*.js",
      "app/views/**/*.html",
      "test/mock/**/*.js",
      "test/spec/**/*.js"
    ],

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8080,

    // BrowserStack Access Setting
    browserStack: {
      build: 'Karma Unit Test',
      project: 'My Angular',
      username: process.env.BROWSERSTACK_USERNAME,
      accessKey: process.env.BROWSERSTACK_ACCESS_KEY
    },

    // BrowserStack Browsers
    // (https://www.browserstack.com/automate/browsers.json)
    customLaunchers: {
      // Mac FireFox / Chrome
      bs_firefox_mac: {
        base: 'BrowserStack',
        browser: 'firefox',
        browser_version: '35',
        os: 'OS X',
        os_version: 'Yosemite'
      },
      bs_chrome_mac: {
        base: 'BrowserStack',
        browser: 'chrome',
        browser_version: '39',
        os: 'OS X',
        os_version: 'Yosemite'
      },

      // Mac Safari 8/7/6.1
      bs_safari8_mac: {
        base: 'BrowserStack',
        browser: 'safari',
        browser_version: '8',
        os: 'OS X',
        os_version: 'Yosemite'
      },
      bs_safari7_mac: {
        base: 'BrowserStack',
        browser: 'safari',
        browser_version: '7',
        os: 'OS X',
        os_version: 'Mavericks'
      },
      bs_safari61_mac: {
        base: 'BrowserStack',
        browser: 'safari',
        browser_version: '6.1',
        os: 'OS X',
        os_version: 'Mountain Lion'
      },

      // Windows FireFox / Chrome
      bs_firefox_windows: {
        base: 'BrowserStack',
        browser: 'firefox',
        browser_version: '35',
        os: 'Windows',
        os_version: '8.1'
      },
      bs_chrome_windows: {
        base: 'BrowserStack',
        browser: 'chrome',
        browser_version: '39',
        os: 'Windows',
        os_version: '8.1'
      },

      // Windows IE11/10
      bs_ie11_windows81: {
        base: 'BrowserStack',
        browser: 'ie',
        browser_version: '11',
        os: 'Windows',
        os_version: '8.1'
      },
      bs_ie10_windows8: {
        base: 'BrowserStack',
        browser: 'ie',
        browser_version: '10',
        os: 'Windows',
        os_version: '8'
      },
      bs_ie11_windows7: {
        base: 'BrowserStack',
        browser: 'ie',
        browser_version: '11',
        os: 'Windows',
        os_version: '7'
      }
    },

    // BrowserStack Access Timeout
    // (https://oligofren.wordpress.com/2014/05/27/running-karma-tests-on-browserstack/)
    browserDisconnectTimeout : 10000, // default 2000
    browserDisconnectTolerance : 1, // default 0
    browserNoActivityTimeout : 4 * 60 * 1000, // default 10000
    captureTimeout : 4 * 60 * 1000, // default 60000

    // Target Browsers
    browsers: [
      // 'bs_firefox_mac',
      'bs_chrome_mac',
      // 'bs_safari8_mac',
      // 'bs_safari7_mac',
      // 'bs_safari61_mac',

      // 'bs_firefox_windows',
      // 'bs_chrome_windows',
      // 'bs_ie11_windows81',
      // 'bs_ie10_windows8',
      // 'bs_ie11_windows7'
    ],

    // Which plugins to enable
    plugins: [
      'karma-browserstack-launcher',
      'karma-jasmine',
      'karma-coverage',
      'karma-spec-reporter',
      'karma-ng-html2js-preprocessor'
    ],

    preprocessors: {
      'app/views/**/*.html': ['ng-html2js'],
      'app/scripts/**/*.js': 'coverage'
    },

    ngHtml2JsPreprocessor: {
      stripPrefix: 'app/',
      moduleName: 'myAngular'
    },

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'

    coverageReporter: {
      type: 'html',
      dir : process.env.CIRCLE_ARTIFACTS ?
              process.env.CIRCLE_ARTIFACTS + '/coverage' :
              'test/coverage'
    },
    reporters: [
      'spec',
      'coverage'
    ]
  });
};
