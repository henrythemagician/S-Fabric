
/*
 * Copyright 2017-present Open Networking Foundation

 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


const conf = require('./gulp.conf');
const pkg = require('../package.json');

module.exports = function (config) {
  const configuration = {
    basePath: '../',
    singleRun: false,
    autoWatch: true,
    logLevel: 'INFO',
    browsers: [
      'PhantomJS',
      // 'Chrome'
    ],
    browserConsoleLogOptions: {
      level: 'log'
    },
    frameworks: [
      'jasmine',
      'es6-shim'
    ],
    files: [
      'node_modules/es6-shim/es6-shim.js',
      conf.path.src('index.spec.js'),
      conf.path.src('**/*.html')
    ],
    preprocessors: {
      [conf.path.src('index.spec.js')]: [
        'webpack'
      ],
      [conf.path.src('**/*.html')]: [
        'ng-html2js'
      ]
    },
    ngHtml2JsPreprocessor: {
      stripPrefix: `${conf.paths.src}/`
    },
    reporters: ['mocha', 'coverage'],
    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    },
    webpack: require('./webpack-test.conf'),
    webpackMiddleware: {
      noInfo: true
    },
    plugins: [
      require('karma-jasmine'),
      require('karma-junit-reporter'),
      require('karma-coverage'),
      require('karma-phantomjs-launcher'),
      require('karma-chrome-launcher'),
      require('karma-phantomjs-shim'),
      require('karma-ng-html2js-preprocessor'),
      require('karma-webpack'),
      require('karma-es6-shim'),
      require('karma-mocha-reporter')
    ]
  };

  config.set(configuration);
};
