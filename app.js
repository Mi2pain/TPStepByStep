// app.js
console.log("It Works !");

var express = require("express");
var app = express();


var http = require("http");
var CONFIG = require("./config.json");
process.env.CONFIG = JSON.stringify(CONFIG);

// init server
var server = http.createServer(app);
server.listen(CONFIG.port);
