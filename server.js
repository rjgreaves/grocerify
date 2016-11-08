var express = require('express');
var path = require("path");
var httpProxy = require('http-proxy');

var proxy = httpProxy.createProxyServer();

var app = new express();

var isProduction = process.env.NODE_ENV === "production";
var port = isProduction ? process.e.PORT : 3000;
var publicPath = path.resolve(__dirname, "public");

var parser = require('body-parser');
require("./server/database.js");

app.use(express.static(publicPath));

// If you only want this for development, you would of course
// put it in the "if" block below
app.all('/api/*', function (req, res) {
    console.log("Calling proxy..");
    proxy.web(req, res, {
        target: 'http://localhost',
        port: 3000,
        secure: false,
        changeOrigin: true
    });
});

if(!isProduction){
  // We require the bundler inside the if block because
  // it is only needed in a development environment. Later
  // you will see why this is a good idea
  var bundle = require('./server/bundle.js');
  bundle();

  // Any requests to localhost:3000/build is proxied
  // to webpack-dev-server
  app.all('/build/*', function (req, res) {
    proxy.web(req, res, {
        target: 'http://localhost:8080'
    });
  });
}

// It is important to catch any errors from the proxy or the
// server will crash. An example of this is connecting to the
// server when webpack is bundling
proxy.on('error', function(e) {
    console.log(e);
  console.log('Could not connect to proxy, please try again...');
});

app.use(parser.json());
app.use(parser.urlencoded({extended:false}));

require('./server/routes/items.js')(app);

app.listen(port, () => {
    console.log(`Server running on port : ${port}`)
})