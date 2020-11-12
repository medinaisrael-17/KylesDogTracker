const db = require("../models");

module.exports = function(app) {
    console.log("api routes");

    //get the dogs and when they were last fed
    app.get("/api/dogs", function(req, res) {
        db.Dog.findAll({}).then(function(data) {
            res.json(data);
        });
    });

    app.post("/api/dogs", function(req, res) {
        const rightNow = new Date().toLocaleString();

        db.Dog.create({
            name: req.body.name,
            lastFed: rightNow
        }).then(function() {
            res.status(200).send("sent new dog");
        })
        .catch(function(err) {
            res.status(401).json(err);
        });
    });
}