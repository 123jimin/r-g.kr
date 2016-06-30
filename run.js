const fs = require('fs');
const orm = require('orm');
const yaml = require('js-yaml');

var config = yaml.safeLoad(fs.readFileSync("./config/config.yaml", 'utf-8'));
var credential = JSON.parse(fs.readFileSync("./config/credential.json", 'utf-8'));
var app = require("./index.js");

var db_option = {
	'protocol': 'mysql',
	'host': credential.db.host,
	'user': credential.db.user,
	'password': credential.db.password,
	'database': credential.db.database,
	'query': {'pool': true, 'debug': true}
};

orm.connect(db_option, (err, db) => {
	if(err){
		console.error(err);
		return process.exit(1);
	}
	app(db, config);
});

