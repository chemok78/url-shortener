'use strict';


module.exports = function(app) {

  var mongodb = require('mongodb');

  //"MongoClient" interface in order to connect to a mongodb server.
  //Using MongoDB's native driver
  var MongoClient = mongodb.MongoClient;

  //MongoDB connection URL, where the database is running on mLab
  var url = process.env.DB_URL;

  //use connect method to connect to mongoDB server
  MongoClient.connect(url, function(err, db) {

    if (err) {

      console.log('Unable to connect to the mongoDB server. Error:', err);

    } else {

      console.log('Connection established to', url);

      app.get("/new/:url(*)", function(req, res) {
      //setup route with url as parameter
      //(*) makes sure the // in http:// are escaped and not start of a path
      
        var request = req.params.url;
        //save parameter url a variable request

        if (/^https?:\/\//.test(request) === true) {
        //parameter must start with http:// or https://

          var collection = db.collection('tinyurls');
          //load the tinyurls collection

          var tinyUrl = {};
          //initialize a tinyURL object with original URL and short URL and index set to a number

          collection.count(function(err, result) {
          //count how many documents the tinyurls collection now has and save the number as result
          
            if (err) {

              console.log(err);

            } else {

              var num = result + 1;
              //initializ a number variable to use as ID parameter for short URL

              var shortUrl = process.env.APP_URL + num;
              //append number to APP URL as short url

              tinyUrl = {

                index: num,

                original_url: request,

                short_url: shortUrl

              }

              collection.insert(tinyUrl, function(err, result) {
              //insert the short URL object in database

                if (err) {

                  console.log(err);

                } else {

                  console.log('Inserted %d documents into the tinyurls collection. The documents inserted with "_id" are:', result.length, result);


                }


              });



              res.json({
              //render the original URL and short URL as JSON Object
                  
                "original_url": request,
                
                "short_url": shortUrl
              
              });


            } 


          }); 


        } else {

          res.json({
          //if URL does not start with http:// or https:// then render this message
            "error": "Wrong url format, make sure you have a valid protocol and real site."
          });

        }

      }); 


      app.get('/:index', function(req,res){
      //dynamic route with index number as short URL. Checks if exists in database and redirects to original URL
        
        var urlNumber = req.params.index;
        //get the parameter
        
        var collection = db.collection('tinyurls');
        //connect with collection tinyurls
        
        var query = {};
        //intialize a query object to work with DB
        
        var index = "index";
        //set index to string index
        
        query.index = parseInt(urlNumber);
        //query.index = parameter
        
        collection.findOne(query, function(err,document){
        //find the one and only entry in DB that matches index number
          if(err){
            
            console.log(err);
            
          };
          
          if(document){
            
            
            res.redirect(document.original_url);
            //redirect to original URL
           
          } else {
            
            
            res.send("Sorry, we don't recognize that url");
            
          }
          
          
        });
      
        
      }); 
      
    }

  }); 


}; 