const express = require('express');
const path = require('path');

const compression = require('compression');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const sassMiddleware = require('node-sass-middleware');

const expressSession = require('express-session');

function RGApp(db, config){
	this.app = express();
	this.db = db;
	this.config = config;

	this.initMiddlewares();
	this.initRoutes();
};

RGApp.prototype.initMiddlewares = function RGApp$initMiddlewares(){
	var app = this.app;
	
	app.use(compression());
	
	// static files
	app.use(sassMiddleware({
		'prefix': "/static/css",
		'src': path.join(__dirname, 'static', 'css'),
		'dest': path.join(__dirname, 'public', 'css'),
		'outputStyle': 'compressed',
	}));
	app.use("/static", express.static("public"));

	// set renderer
	app.set("view engine", 'pug');

	// body parser, cookie parser
	app.use(bodyParser.urlencoded({'extended': false}));
	app.use(bodyParser.json());
	app.use(cookieParser());

	// sessions
	app.use(expressSession({'secret': "(change this) r-g.kr session secret"}));
};

RGApp.prototype.initRoutes = function RGApp$initRoutes(){
	var app = this.app;

	app.get("/", (req, res) => {
		res.render('index');
	});

	app.get("/register", (req, res) => {
		res.render('register');
	});
};

RGApp.prototype.start = function RGApp$start(){
	this.app.listen(this.config.port, () => {
		console.log(`Listening on port ${this.config.port}`);
	});
};

module.exports = RGApp;
