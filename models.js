module.exports = (db) => {

var models = {};

models.User = db.define('user', {
	'id': {'type': 'serial', 'key': true},
	'user_name': {'type': 'text', 'size': 32, 'unique': true},
	'creation_time': {'type': 'date', 'time': true},
	'email': {'type': 'text', 'size': 255, 'unique': true},
	'email_verified': {'type': 'boolean', 'defaultValue': false},
	'password_hash': {'type': 'binary', 'size': 64},
	'password_salt': {'type': 'binary', 'size': 64}
});

return models;

};
