'use strict';

// Username and Access Keys
var browserstackUsername = process.env.BROWSERSTACK_USERNAME;
var browserstackAccessKey = process.env.BROWSERSTACK_ACCESS_KEY;

exports.config = {
  allScriptsTimeout: 300000,

  // BrowserStack's selenium server address
  seleniumAddress: 'http://hub.browserstack.com/wd/hub',

  specs: [
    'scenarios.js'
  ],

  // VM concurrency
  maxSessions: 2,

  // Browser capabilities
  // http://www.browserstack.com/automate/capabilities
  // https://www.browserstack.com/automate/browsers.json
  multiCapabilities: [

    // Mac FireFox / Chrome (FireFox is not available for protractor yet ?)
    // {
    //   'name': 'My Angular',
    //   'browserstack.user': browserstackUsername,
    //   'browserstack.key': browserstackAccessKey,
    //   'browserstack.local': true,
    //   'browserName' : 'Firefox',
    //   // 'browser_version' : '35',
    //   'os' : 'OS X',
    //   // 'os_version' : 'Yosemite'
    // },
    {
      'name': 'My Angular',
      'browserstack.user': browserstackUsername,
      'browserstack.key': browserstackAccessKey,
      'browserstack.local': true,
      'browserstack.debug': true,
      'browserName' : 'Chrome',
      // 'browser_version' : '39',
      'os' : 'OS X',
      // 'os_version' : 'Yosemite'
    },

    // // Mac Safari 8/7/6.1
    // {
    //   'name': 'My Angular',
    //   'browserstack.user': browserstackUsername,
    //   'browserstack.key': browserstackAccessKey,
    //   'browserstack.local': true,
    //   'browserName' : 'Safari',
    //   'browser_version' : '8',
    //   'os' : 'OS X',
    //   'os_version' : 'Yosemite'
    // },
    // {
    //   'name': 'My Angular',
    //   'browserstack.user': browserstackUsername,
    //   'browserstack.key': browserstackAccessKey,
    //   'browserstack.local': true,
    //   'browserName' : 'Safari',
    //   'browser_version' : '7',
    //   'os' : 'OS X',
    //   'os_version' : 'Mavericks'
    // },
    // {
    //   'name': 'My Angular',
    //   'browserstack.user': browserstackUsername,
    //   'browserstack.key': browserstackAccessKey,
    //   'browserstack.local': true,
    //   'browserName' : 'Safari',
    //   'browser_version' : '6.1',
    //   'os' : 'OS X',
    //   'os_version' : 'Mountain Lion'
    // },

    // // Windows FireFox / Chrome (FireFox is not available for protractor yet ?)
    // // {
    // //   'name': 'My Angular',
    // //   'browserstack.user': browserstackUsername,
    // //   'browserstack.key': browserstackAccessKey,
    // //   'browserstack.local': true,
    // //   'browserName' : 'Firefox',
    // //   // 'browser_version' : '35',
    // //   'os' : 'Windows',
    // //   // 'os_version' : '8.1'
    // // },
    // {
    //   'name': 'My Angular',
    //   'browserstack.user': browserstackUsername,
    //   'browserstack.key': browserstackAccessKey,
    //   'browserstack.local': true,
    //   'browserName' : 'Chrome',
    //   // 'browser_version' : '39',
    //   'os' : 'Windows',
    //   // 'os_version' : '8.1'
    // },

    // // Windows IE11/10
    // {
    //   'name': 'My Angular',
    //   'browserstack.user': browserstackUsername,
    //   'browserstack.key': browserstackAccessKey,
    //   'browserstack.local': true,
    //   'browserName' : 'Internet Explorer',
    //   'browser_version' : '11',
    //   'os' : 'Windows',
    //   'os_version' : '8.1'
    // },
    // {
    //   'name': 'My Angular',
    //   'browserstack.user': browserstackUsername,
    //   'browserstack.key': browserstackAccessKey,
    //   'browserstack.local': true,
    //   'browserName' : 'Internet Explorer',
    //   'browser_version' : '10',
    //   'os' : 'Windows',
    //   'os_version' : '8'
    // },
    // {
    //   'name': 'My Angular',
    //   'browserstack.user': browserstackUsername,
    //   'browserstack.key': browserstackAccessKey,
    //   'browserstack.local': true,
    //   'browserName' : 'Internet Explorer',
    //   'browser_version' : '11',
    //   'os' : 'Windows',
    //   'os_version' : '7'
    // }
  ],

  baseUrl: 'http://localhost:9001/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    showColors: true,
    isVerbose: true,
    includeStackTrace: true,
    defaultTimeoutInterval: 3600000
  }
};
