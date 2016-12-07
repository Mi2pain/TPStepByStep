console.log("It Works!");

var express = require("express");
var path = require("path");
var http = require("http");
var CONFIG = require("./config.json");
var qs = require('querystring');
var fs = require('fs');

process.env.CONFIG = JSON.stringify(CONFIG);

var defaultRoute = require("./app/routes/default.route.js");

var app = express();

var server = http.createServer(app);
var listPres = [];

app.get("/loadPres", function (request, response) {

	fs.readdir(CONFIG.presentationDirectory, (err, files) => {
		var index = 0;
		var extFile = files.filter((file) => path.extname(file) === '.json');

		extFile.forEach(function(file) {		
			fs.readFile(CONFIG.presentationDirectory + '/' + file, 'utf8', function (err, data) {
				if (err) {
					return console.log(err);
				}

				listPres.push(JSON.parse(data.toString()));
			});

			if (++index === extFile.length) {
				response.send(listPres);
			}
		});
	});
});

app.post("/savePres", function(request, response) {
	
	var body = '';

	request.on('data', function (data) {
		body += data;

            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6)
            	request.connection.destroy();
        });

	request.on('end', function () {
		var post = JSON.parse(body);

		console.log(JSON.stringify(post));
            // use post['blah'], etc.
            fs.writeFile(CONFIG.presentationDirectory + '/' + post.id + ".pres.json", JSON.stringify(post));
            response.send("Saved!");
        });
});

app.use(defaultRoute);
app.use("/admin", express.static(path.join(__dirname, "public/admin")));
app.use("/watch", express.static(path.join(__dirname, "public/watch")));
server.listen(CONFIG.port);