const express = require('express');

var app = module.exports = express();

app.get("/", (req, res) => {
	res.send("Hello, world!");
});

module.exports = (db, config) =>  {
	app.listen(config.port, () => {
		console.log(`Listening on port ${config.port}`);
	});
};
