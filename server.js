'use strict';

//require packages
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var api = require('./api/shortener.js');
//var api set to the shortener.js file
var routes = require('./routes/index.js');
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
//Using MongoDB's native 
var MongoClient = mongodb.MongoClient;

//MongoDB connection URL, where the database is running on mLab
var url = 'mongodb://jayjay:abcd1234@ds013574.mlab.com:13574/urls';

//use connect method to connect to mongoDB server
MongoClient.connect(url, function(err,db){
   
   if(err){
      
      console.log('Unable to connect to the mongoDB server. Error:', err);
      
   } else{
      
      console.log('Connection established to', url);
      
      //do something with the database here
      
      db.close();
      
   }
   
});


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
    
   res.render 
    
});

app.listen(port,function(){
//create server   
   
   console.log('Node.js listening on port ' + port);
    
});