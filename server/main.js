var express = require('express');

var app = new express();

var parser = require('body-parser');

require("")
require("./database.js");

var React = require('react/addons');

var GroceryItem = require("./models/GroceryItem.js");

app.get('/',function(req,res){
    //res.render('./../app/index.tsx',{});
    var application = React.createFactory(require("./../app/components/GroceryItemList.tsx"));

    GroceryItem.find(function(err, doc){
        var generated = React.renderToString(
            application({
                items: doc 
            });
        )
    });

    res.render("./../app/index.ejs", { reactOutput: generated });


})
.use(express.static(__dirname + '/../.tmp'))
.listen(7777);

app.use(parser.json());
app.use(parser.urlencoded({extended:false}));

require('./routes/items.js')(app);

console.log("Listening on port 7777....")