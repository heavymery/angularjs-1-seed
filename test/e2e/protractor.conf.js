'use strict';

exports.config = {
  allScriptsTimeout: 11000,

  seleniumAddress: 'http://localhost:4444/wd/hub',

  specs: [
    'scenarios.js'
  ],

  capabilities: {
    browserName: 'chrome'
  },

  // multiCapabilities: [{
  //   browserName: 'firefox'
  // }, {
  //   browserName: 'chrome'
  // }, {
  //   browserName: 'safari' // SafariDriver (http://docs.seleniumhq.org/download/)
  // }],

  baseUrl: 'http://localhost:9001/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};