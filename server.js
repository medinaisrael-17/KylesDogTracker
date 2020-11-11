const express = require("express");

const PORT = process.env.PORT || 8080;
const db = require("./models");

const app = express();

app.use(express.urlencoded({extended: true}));

app.use(express.json);
app.use(express.static("public"));

require("./routes/api-routes.js")(app);

db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  })
})