var express = require("express");
var path = require("path");

module.exports = (PORT) => {
    const app = express();

    var publicPath = path.resolve(__dirname, "dist");

    var parser = require('body-parser');
    require("./database.js");

    app.use(express.static(publicPath));

    app.use(parser.json());
    app.use(parser.urlencoded({ extended: false }));

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    require('./routes/items.js')(app);

    app.listen(PORT, () => {
        console.log(`Server running on port : ${PORT}`)
    });

};