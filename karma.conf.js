var webpack = require('webpack');
var webpackConfig = {
  entry: './src/Thumb.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
        new webpack.LoaderOptionsPlugin({
          options: {
            loaders: [
                {
                    test: /\.js$/, 
                    loader: 'babel-loader', 
                    query:{
                        presets:['es2015']
                    }
                },
                { test: /\.css$/, loader: "style!css" },
            ]
          }
        })
    ]
}
// Karma configuration
// Generated on Sat Apr 15 2017 15:49:47 GMT+0800 (中国标准时间)
module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],
    
    // list of files / patterns to load in the browser
    files: [
        {pattern: './public/javascripts/src/Thumb.js', watched: false},
        {pattern: './public/test/Thumb.spec.js', watched: false},
    ],

    // list of files to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        './public/javascripts/src/Thumb.js': ['webpack'] ,
        './public/test/Thumb.spec.js': ['webpack']  
    },
    webpack: webpackConfig,
    webpackMiddleware: {
        noInfo: true
      },
    plugins: [
        'karma-jasmine',
        'karma-chrome-launcher',
        'karma-phantomjs-launcher',
        'karma-webpack'
    ],
    // webpackPreprocessor: {
    //   configPath: "./webpack.config.js"
    // },
    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome', 'PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
