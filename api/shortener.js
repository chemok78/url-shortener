'use strict';


module.exports = function(app){
    
    app.get('/:url', function(req,res){
        
       //get and parse the url parameter    
        
       var request = req.params;
       
       res.send({"original_url": request.url});
       
       
       //shorten the url
       
       //save the relationship between original url and shortened url in database
       
       //if URL is valid, res.json(original_url, shortened_url)
       //if URL is not valid, res.json("error": "Wrong url format, make sure you have a valid protocol and real site.")
       
       //create a custom route that checks if it is shortened url
       //if a shortened url, redirect to original URL    
        
    });
    
    
    
};