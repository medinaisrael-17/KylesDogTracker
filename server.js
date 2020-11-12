require("dotenv").config();
const express = require("express");

const PORT = process.env.PORT || 8888;
const db = require("./models");

const app = express();

app.use(express.urlencoded({extended: false}));

app.use(express.json);
app.use(express.static("public"));

console.log("before the routes");
require("./routes/apiRoutes.js")(app);
require("./routes/htmlRoutes.js")(app);

db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  })
})