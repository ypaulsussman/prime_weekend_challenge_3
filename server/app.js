var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var index = require('./modules/index.js');
var port = 5000;



app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', index);



app.listen(port, function() {
  console.log("app is running on port: ", port);
});
