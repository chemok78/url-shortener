'use strict';

//require packages
var express = require('express');
var app = express();
//use .env to set environment variables
require('dotenv').config();
var bodyParser = require('body-parser');
//var api set to the shortener.js file
var api = require('./api/shortener.js');
// var routes set to the index.js routes file
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

/*app.get('/', function(req,res){
//set up root route    
   res.render;
    
});*/

app.listen(port,function(){
//create server   
   
   console.log('Node.js listening on port ' + port);
    
});