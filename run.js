const fs = require('fs');
const orm = require('orm');
const yaml = require('js-yaml');

var config, credential;

config = yaml.safeLoad(fs.readFileSync("./config/config.yaml", 'utf-8'));
try{
	credential = fs.readFileSync("./config/credential.yaml" 'utf-8');
}catch(e){
	credential = "db:\n    host: localhost\n    user: rg\n    password: \"(change this) r-g.kr\"\n    database: rgDB";
	fs.writeFileSync("./config/credential.yaml", credential, 'utf-8');
	console.warn("./config/credential.yaml was created");
}
credential = yaml.safeLoad(credential);

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

