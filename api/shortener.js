'use strict';


module.exports = function(app) {

  var mongodb = require('mongodb');

  //We need to work with "MongoClient" interface in order to connect to a mongodb server.
  //Using MongoDB's native 
  var MongoClient = mongodb.MongoClient;

  //MongoDB connection URL, where the database is running on mLab
  var url = process.env.DB_URL;


  //use connect method to connect to mongoDB server
  MongoClient.connect(url, function(err, db) {

    if (err) {

      console.log('Unable to connect to the mongoDB server. Error:', err);

    } else {

      console.log('Connection established to', url);

      //do something with the database here

      app.get("/new/:url(*)", function(req, res) {


        var request = req.params.url;

        if (/^https?:\/\//.test(request) === true) {

          var collection = db.collection('tinyurls');

          var amount = 0;

          var num = 0;

          var tinyUrl = {};

          collection.count(function(err, result) {

            if (err) {

              console.log(err);

            } else {

              amount = result;

              var num = amount + 1;

              var shortUrl = process.env.APP_URL + num;

              tinyUrl = {

                index: num,

                original_url: request,

                short_url: shortUrl

              }

              collection.insert(tinyUrl, function(err, result) {

                if (err) {

                  console.log(err);

                } else {

                  console.log('Inserted %d documents into the tinyurls collection. The documents inserted with "_id" are:', result.length, result);


                }


              });



              res.json({
                  
                "original_url": request,
                
                "short_url": shortUrl
              
              });


            } //end if/else


          }); //collection.count


        } else {

          res.json({
            "error": "Wrong url format, make sure you have a valid protocol and real site."
          });

        }

      });


    }

  }); //Mongoclient.connect;


}; //module.exports