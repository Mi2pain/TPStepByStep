console.log("It Works !");

var express = require("express");
var path = require("path");

var http = require("http");
var CONFIG = require("./config.json");
process.env.CONFIG = JSON.stringify(CONFIG);

var defaultRoute = require("./app/routes/default.route.js");

var app = express();

var server = http.createServer(app);


app.get("/loadPres", function(request, response) {
response.send("It works !");
});

app.get("/savePres", function(request, response) {
response.send("It works !");
});

// init server

app.use(defaultRoute);
app.use("/admin", express.static(path.join(__dirname, "public/admin")));
app.use("/watch", express.static(path.join(__dirname, "public/watch")));
server.listen(CONFIG.port);
