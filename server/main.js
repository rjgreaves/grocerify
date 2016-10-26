var express = require("express");

var app = new express();

app
    .set('view engine', 'ejs')
    .get("/", function(req, res){
        res.render("./../app/index",{});
    })
    .use(express.static(__dirname + "/../.temp"))
    .listen(7777);