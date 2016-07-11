const express = require('express');
const path = require('path');

const initModels = require('./models.js');

const compression = require('compression');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const sassMiddleware = require('node-sass-middleware');

const expressSession = require('express-session');

const passport = require('passport');
const PassportLocalStrategy = require('passport-local').Strategy;

function RGApp(db, config, credential){
	this.app = express();
	this.db = db;
	this.config = config;
	this.credential = credential;

	this.models = initModels(this.db);

	this.initPassport();

	this.initMiddlewares();
	this.initRoutes();
};

RGApp.prototype.initPassport = function RGApp$initPassport(){
	passport.use(new PassportLocalStrategy({
		'usernameField': 'id',
		'passwordField': 'pw'
	}, (username, password, done) => {
		this.models.User.one({'user_name': username}, (err, user) => {
			if(err) return done(err, false);
			if(!user) return done(null, false);
			user.check(password).then(result => {
				if(result) return done(null, user);
				else return done(null, false);
			});
		});
	}));
	passport.serializeUser((user, done) => done(null, user.id));
	passport.deserializeUser((id, done) => this.models.User.one({'id': id},
		(err, user) => done(err, user)));
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
	app.use(expressSession({'secret': this.credential.session.secret}));

	// passport
	app.use(passport.initialize());
	app.use(passport.session());
};

RGApp.prototype.initRoutes = function RGApp$initRoutes(){
	var app = this.app;

	app.get("/", (req, res) => {
		res.render('index');
	});

	app.get("/register", (req, res) => {
		res.render('register');
	});

	app.get("/login", (req, res) => {
		res.render('login');
	});

	app.post("/login", passport.authenticate('local', {
		'successRedirect': "/",
		'failureRedirect': "/login?failed=1"
	}));
};

RGApp.prototype.start = function RGApp$start(){
	this.db.sync((err) => {
		if(err){
			console.error(err);
			return;
		}
		this.app.listen(this.config.port, () => {
			console.log(`Listening on port ${this.config.port}`);
		});
	});
};

module.exports = RGApp;
