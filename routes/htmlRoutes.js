const path = require("path");

module.exports = function (app) {
    console.log("html routes");

    app.get("*", function (req, res) {
        console.log("at the route");
        res.sendFile(path.join(__dirname, "../public/index.html"))
    });
}