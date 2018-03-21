var mongoose = require('mongoose');
var fs = require('fs')
var UC = require('../generators/app/templates/uc');

var config = {
  "db": "<%= dbName %>",  
  "host": "<%= dbHost %>",  
  "user": "<%= dbUser %>",
  "pw": "<%= dbPassword %>",
  "port": "<%= dbPort %>",
  "file": "<%= json %>"
};

var port = (config.port.length > 0) ? ":" + config.port : '';
var login = (config.user.length > 0) ? config.user + ":" + config.pw + "@" : '';
var uristring = "mongodb://" + login + config.host + port + "/" + config.db;   

// Connect to Database
mongoose.Promise = global.Promise
mongoose.connect(uristring, function (err, res) {
  if(err){
    console.log('Error connecting to: ' + uristring + '. ' + err);
  }else{
    console.log('Successfully connected to: ' + uristring);
    console.log('Importing ' + config.file)

    var obj = JSON.parse(fs.readFileSync(config.file, 'utf8'));
    UC.collection.insert(obj, function(err,result) {
      if(err){
        console.log(err)
      }else{
        console.log('Imported JSON file with success.')
      }
   });
  }
});

exports.mongoose = mongoose;