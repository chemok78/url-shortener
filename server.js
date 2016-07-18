'use strict';

//require packages
var express = require('express');
var app = express();
require('dotenv').config();
//use .env to set environment variables
var bodyParser = require('body-parser');
var api = require('./api/shortener.js');
//var api set to the shortener.js file
var routes = require('./routes/index.js');

//configuration for bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/public', express.static(process.cwd() + '/public'));

var port = process.env.PORT || 8080;

api(app);
//call api module file with our app as a parameter

routes(app);
//call routes module file with our app as a parameter

app.get('/', function(req,res){
    
   res.render;
    
});

app.listen(port,function(){
//create server   
   
   console.log('Node.js listening on port ' + port);
    
});