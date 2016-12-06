// app.js
console.log("It Works !");

var express = require("express");
var app = express();
var defaultRoute = require("./app/routes/default.route.js");
var http = require("http");
var CONFIG = require("./config.json");
var server = http.createServer(app);
var path = require("path");

process.env.CONFIG = JSON.stringify(CONFIG);

// init server
server.listen(CONFIG.port);
app.use(defaultRoute);
app.use("/admin", express.static(path.join(__dirname, "public/admin")));
app.use("/watch", express.static(path.join(__dirname, "public/watch")));
