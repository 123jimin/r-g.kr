const fs = require('fs');
const yaml = require('js-yaml');

var config = yaml.safeLoad(fs.readFileSync("./config.yaml", 'utf-8'));
var app = require("./index.js");

app(config);
