/** key.js: for generating and checking password hash **/

const crypto = require('crypto');
const scrypt = require('scrypt');

const params = scrypt.paramsSync(0.1);

// Key.hash(password).then(hash => {...})
// Key.check(hash, password).then(result => result ? ... : ...)
const Key = module.exports = {
	'hash': (password) => scrypt.kdf(password, params),
	'check': (key, password) => scrypt.verifyKdf(key, password)
};
