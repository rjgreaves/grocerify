var mongoose = require("mongoose");
var Promise = require('bluebird');

var Schema = mongoose.Schema;

var GroceryItemSchema = new Schema ({
    id: String,
    name: String,
    purchased: Boolean
});

var GroceryItem = mongoose.model("GroceryItem", GroceryItemSchema, "groceryItems");

module.exports = GroceryItem;