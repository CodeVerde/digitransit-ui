/* globals module, process */

'use strict';

module.exports = {
  'browsers': {
    'chrome59': {
      'desiredCapabilities': {
        'browserName': 'chrome',
        'locationContextEnabled': false,
        'os': 'OS X',
        'os_version': 'El Capitan',
        'version': '59'
      },
      'windowSize': '600x1024'
    },
    'edge15': {
      'desiredCapabilities': {
        'browserName': 'edge',
        'locationContextEnabled': false,
        'os': 'Windows',
        'os_version': '10',
        'version': '15'
      },
      'windowSize': '600x1024'
    },
    'ie11': {
      'desiredCapabilities': {
        'browser': 'IE',
        'browserName': 'internet explorer',
        'browser_version': '11',
        'locationContextEnabled': false,
        'os': 'Windows',
        'os_version': '8.1'
      },
      'windowSize': '600x1024'
    },
    'safari10': {
      'desiredCapabilities': {
        'browserName': 'safari',
        'locationContextEnabled': false,
        'os': 'OS X',
        'os_version': 'Sierra',
        'safari.options': {
          'technologyPreview': true
        },
        'version': '10.1'
      },
      'windowSize': '600x1024'
    }
  },
  'httpTimeout': 40000,
  'retry': 1,
  'rootUrl': 'http://localhost:8080',
  'screenshotsDir': './test/visual-images/',
  'sessionRequestTimeout': 120000,
  'sessionsPerBrowser': 1,
  'suitesPerSession': 10,
  'system': {
    'parallelLimit': 3,
    'plugins': {
      'browserstack': {
        'localIdentifier': process.env.IDENTIFIER
      }
    }
  }
};
