var Promise = require("bluebird");

module.exports = function(app){

    var GroceryItem = require("./../models/GroceryItem.js");

    app.route("/api/items")
        .get((req, res) => {
            console.log("Finding...")
            GroceryItem.find()
                .then((doc) => {
                    console.log("Returning Results...")
                    console.log(doc);
                    res.send(doc);
                })
        })
        .post((req, res) => {
            var data = req.body;
            var groceryItem = new GroceryItem(data);
            groceryItem.save((err, data) => {
                res.status(200).send();
            });
        });
}