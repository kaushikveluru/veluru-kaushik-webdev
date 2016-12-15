var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

require("./assignment/app.js")(app);

ipaddress="127.0.0.1"
port = 3000;

app.listen(port, ipaddress, function(){console.log("running")});
