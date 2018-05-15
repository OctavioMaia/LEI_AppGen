var mongoose = require('mongoose');
var fs = require('fs')
var UC = require('../generators/app/templates/uc');

var config = {
  "db": "appgen",  
  "host": "localhost",  
  "user": "",
  "pw": "",
  "port": "27017",
  "collectionname": "alfredo",
  "collectioncrud": "n",
};

var port = (config.port.length > 0) ? ":" + config.port : '';
var login = (config.user.length > 0) ? config.user + ":" + config.pw + "@" : '';
var uristring = "mongodb://" + login + config.host + port + "/" + config.db;   

// Connect to Database
mongoose.Promise = global.Promise
mongoose.connect(uristring, function (err, res) {
	console.log('Successfully connected to: ' + uristring);
    if(config.collectionname!=''){
    	res.createCollection(config.collectionname, function(err, result) {
		if (err) 
			throw err;
        else
          	console.log("Collection " + config.collectionname + " is created!");
    	});
	}
	if(config.collectioncrud=='y'){ 
    }
});

exports.mongoose = mongoose;