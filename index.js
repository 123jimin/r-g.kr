const express = require('express');

const bodyParser = require('body-parser');

var app = express();
var db = null;

// app.use(require('compression'));

app.use("/static", express.static("static"));

app.set("view engine", 'pug');
app.use(bodyParser.urlencoded({'extended': false}));
app.use(bodyParser.json());
// app.use(require('cookie-parser'));

app.get("/", (req, res) => {
	res.render('base');
});

module.exports = (database, config) =>  {
	db = database;
	app.listen(config.port, () => {
		console.log(`Listening on port ${config.port}`);
	});
};
