const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');
const sassMiddleware = require('node-sass-middleware');

var app = express();
var db = null;

// app.use(require('compression'));

app.use(sassMiddleware({
	'prefix': "/static/css",
	'src': path.join(__dirname, 'static', 'css'),
	'dest': path.join(__dirname, 'public', 'css'),
	'outputStyle': 'compressed',
}));

app.use("/static", express.static("public"));

app.set("view engine", 'pug');
app.use(bodyParser.urlencoded({'extended': false}));
app.use(bodyParser.json());
// app.use(require('cookie-parser'));

app.get("/", (req, res) => {
	res.render('index');
});

module.exports = (database, config) =>  {
	db = database;
	app.listen(config.port, () => {
		console.log(`Listening on port ${config.port}`);
	});
};
