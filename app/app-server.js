var path = require('path');
var webpack = require('webpack');
var WebpackDevServer = require("webpack-dev-server");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var nodeModulesPath = path.resolve(__dirname, "node_modules");
var buildPath = path.resolve(__dirname, 'dist');
var mainPath = path.resolve(__dirname, 'app', 'index.tsx');

module.exports = function (PORT) {

var ExtractTextPlugin = require("extract-text-webpack-plugin");

var config = require("../webpack.config.js");

var compiler = webpack(config);
    
    const server = new WebpackDevServer(
        compiler
        ,{
            proxy: {
                "/public/api/*": {
                    target: {
                        host: "localhost",
                        protocol: "http",
                        port: PORT-1,
                    },
                    secure: false,
                    changeOrigin: true,
                    pathRewrite: {
                        '^/public': ''
                    }
                }
            }
        }
    );

    server.listen(PORT, "localhost");

    console.log("app-server listenting on port:" + PORT);

}