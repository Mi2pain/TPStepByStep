console.log("It Works !");

var express = require("express");
var path = require("path");

var http = require("http");
var CONFIG = require("./config.json");

process.env.CONFIG = JSON.stringify(CONFIG);

var defaultRoute = require("./app/routes/default.route.js");

var app = express();

var server = http.createServer(app);
var listPres = [];

app.get("/loadPres", function (request, response) {

	fs = require('fs');

	fs.readdir(CONFIG.presentationDirectory, (err, files) => {
		var index = 0;
		var extFile = files.filter((file) => path.extname(file) === '.json');

		extFile.forEach(function(file) {		
			fs.readFile(CONFIG.presentationDirectory + '/' + file, 'utf8', function (err, data) {
				if (err) {
					return console.log(err);
				}

				listPres.push(JSON.parse(data.toString()));
				console.log(JSON.parse(data.toString()));
			});

			if (++index === extFile.length) {
				response.send(listPres);
			}
		});
	});
});

app.get("/savePres", function(request, response) {
	response.send("It works !");
});

// init server
app.use(defaultRoute);
app.use("/admin", express.static(path.join(__dirname, "public/admin")));
app.use("/watch", express.static(path.join(__dirname, "public/watch")));
server.listen(CONFIG.port);
