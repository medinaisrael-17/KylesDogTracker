const db = require("../models");

module.exports = function (app) {
    // get the dogs and when they were last fed
    app.get("/api/dogs", function (req, res) {
        db.Dog.findAll({}).then(function (data) {
            res.json(data);
        });
    });

    // send a new dog
    app.post("/api/dogs", function (req, res) {
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

    // update when it was fed
    app.put("/api/dogs", function (req, res) {
        db.Dog.update(
            {
                lastFed: req.body.lastFed
            },
            { where: { id: req.body.id } }
        ).then(function (dogUpdate) {
            res.json(dogUpdate);
        });
    });

    // delete a dog
    app.delete("/api/dogs", function(req, res) {
        db.Dog.destroy({
            where: {
                id: req.body.id
            }
        }).then(function() {
            res.send("deleted the dog :-(");
        });
    });
}