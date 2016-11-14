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

    app.route("/api/items/:id")
        .delete((req, res) => {
            console.log("Deleting...");
            GroceryItem.find({
                _id: req.params.id
            }).remove((x) => {
                console.log("Removed..", x)
            });
        })
        .patch((req, res) => {
            GroceryItem.findOne({
                _id: req.body._id
            }, (err, doc) => {
                for (var key in req.body){
                    doc[key] = req.body[key];
                }
                doc.save();
                res.status(200).send();
            })
        })
}