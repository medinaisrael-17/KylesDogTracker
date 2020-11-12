const db = require("../models");

module.exports = function (app) {
    console.log("api routes");

    //get the dogs and when they were last fed
    app.get("/api/dogs", function (req, res) {
        db.Dog.findAll({}).then(function (data) {
            res.json(data);
        });
    });

    app.post("/api/dogs", function (req, res) {
        console.log(req.body);

        db.Dog.create({
            name: req.body.name,
            lastFed: ""
        }).then(function () {
            res.status(200).send("sent new dog");
        })
            .catch(function (err) {
                res.status(401).json(err);
            });
    });

    app.put("/api/dogs", function (req, res) {
        console.log(req.body)
        console.log(req.body.id);

        db.Dog.update(
            {
                lastFed: req.body.lastFed
            },
            { where: { id: req.body.id } }
        ).then(function (dogUpdate) {
            res.json(dogUpdate);
        });
    });
}