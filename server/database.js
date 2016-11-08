var mongoose = require("mongoose");
var Promise = require("bluebird");

var uri = "mongodb://127.0.0.1/grocery";
console.log("Got Uri...");

mongoose.Promise = require('bluebird');

console.log("Got Options...");
mongoose.connect(uri);
var db = mongoose.connection;
console.log("Created db...");
var GroceryItem = require("./models/GroceryItem.js");

db.once("open", () => {

    console.log("Connected");

    var items = [
        {
            name: "Ice Cream"
        },
        {
            name: "Waffles",
            purchased: true
        },
        {
            name: "Cotton Candy"
        },
        {
            name: "Snarks"
        }
    ];

    items.forEach((item) => {
        console.log("Adding Item...");
        var groceryItem = new GroceryItem(item);
        console.log(groceryItem);

        var query = { name: item.name };
        
        GroceryItem.find(
            query,
            function (err, doc) {
                if(err){
                    console.log(err);
                } else if (doc.length === 0) {
                    groceryItem.save((err, doc) => {
                        if(err){
                            console.log(err);
                        } else {
                            console.log("Inserted...");
                        }
                    })
                } else {
                    console.log(doc);
                    console.log("Found...");
                }
            }
        );

    });

});
