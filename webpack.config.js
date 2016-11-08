var path = require('path');
var webpack = require('webpack');
var nodeModulesPath = path.resolve(__dirname, "node_modules");
var buildPath = path.resolve(__dirname, 'public', 'build');
var mainPath = path.resolve(__dirname, 'app', 'index.tsx');

var ExtractTextPlugin = require("extract-text-webpack-plugin");

// http://www.christianalfoni.com/articles/2015_04_19_The-ultimate-webpack-setup
var config = {
    devtool: "eval",
    entry: [

        // For hot style updates
        'webpack/hot/dev-server',

        // The script refreshing the browser on none hot updates
        'webpack-dev-server/client?http://localhost:8080',

        // Our application
        mainPath
    ],
    output: {

        // We need to give Webpack a path. It does not actually need it,
        // because files are kept in memory in webpack-dev-server, but an
        // error will occur if nothing is specified. We use the buildPath
        // as that points to where the files will eventually be bundled
        // in production
        path: buildPath,
        filename: 'bundle.js',

        // Everything related to Webpack should go through a build path,
        // localhost:3000/build. That makes proxying easier to handle
        publicPath: '/'
    },
  module: {

    loaders: [
    {
        test: /\.tsx?$/,
        exclude: [nodeModulesPath],
        loader: 'ts-loader'
    },
    // I highly recommend using the babel-loader as it gives you
    // ES6/7 syntax and JSX transpiling out of the box
    {
      test: /\.js$/,
      loader: ['react-hot', 'jsx', 'babel'],
      exclude: [nodeModulesPath]
    },
    {
        test: /\.scss$/,
        exclude: [nodeModulesPath],
        loader: ExtractTextPlugin.extract('css!sass')
    }
    ],
    preLoaders: [
        {
            test: /\.js$/,
            exclude: [nodeModulesPath],
            loader: 'source-map-loader'
        }
    ]
  },
    resolve: {
        extensions: ["", ".webpack.js",".web.js",".ts",".tsx",".js"]
    },

  // We have to manually add the Hot Replacement plugin when running
  // from Node
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('main.css', {
            allChunks: true
        })
    ]
};

module.exports = config;
