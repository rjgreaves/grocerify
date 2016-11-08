var express = require('express');

var app = new express();

var parser = require('body-parser');
require("./database.js");

app.get('/',function(req,res){
    res.render('./../app/index.tsx',{});
})
.use(express.static(__dirname + '/../.tmp'))
.listen(7777);

app.use(parser.json());
app.use(parser.urlencoded({extended:false}));

require('./routes/items.js')(app);

console.log("Listening on port 7777....")