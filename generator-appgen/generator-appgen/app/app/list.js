var configDB  = require('./../config/database.js');

var mongoose  = require('mongoose');
var express   = require('express');
var router    = express.Router();

// NEWSFEED ==============================
router.get('/', function(req, res) {
    console.log('listing')
    mongoose.Promise = global.Promise
    mongoose.connect(configDB.url);
    var connection = mongoose.connection;

    connection.on('error', console.error.bind(console, 'connection error:'));
    connection.once('open', function() {
        console.log("entrei")
        mongoose.connection.db.collection('posts', function(err, collection){
            if(!err){
                collection.find({}).toArray(function(err, data){
                    console.log(data)
                    if(!err){
                        res.render('list', {
                            title: 'Listing',
                            data: data
                        });
                    }
                    else
                        console.log(err)
                })
            }else{
                console.log(err)
            }
        });
    });
});

router.get('/:filter', function(req, res) {
    var filt = req.params.filter
    console.log(filt)
    mongoose.Promise = global.Promise
    mongoose.connect(configDB.url);
    var connection = mongoose.connection;

    connection.on('error', console.error.bind(console, 'connection error:'));
    connection.once('open', function() {
        console.log("entrei")
        mongoose.connection.db.collection('posts', function(err, collection){
            if(!err){
                collection.find( {Type:filt} ).toArray(function(err, data){
                    console.log(data)
                    if(!err){
                        res.render('list', {
                            title: 'Listing',
                            data: data
                        });
                    }
                    else
                        console.log(err)
                })
            }else{
                console.log(err)
            }
        });
    });
});


module.exports = router;