var configDB  = require('./../config/database.js');

var mongoose  = require('mongoose');
var express   = require('express');
var router    = express.Router();

var ObjectID = require('mongodb').ObjectID;

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

router.get('/remove/:id', function(req, res) {
    var id = req.params.id
    objectID = new ObjectID(id);
    console.log(id)
    mongoose.Promise = global.Promise
    mongoose.connect(configDB.url);
    var connection = mongoose.connection;

    connection.on('error', console.error.bind(console, 'connection error:'));
    connection.once('open', function() {
        console.log("entrei")
        mongoose.connection.db.collection('posts', function(err, collection){
            if(!err){
                collection.remove({_id:objectID})
                    res.render('success', {
                        title: 'Success',
                        message: 'Data removed with success!',
                        href: '/'
                    });
            }else{
                console.log(err)
            }
        });
    });
});

/*
router.get('/edit/:id', function(req, res) {
    var id = req.params.id
    objectID = new ObjectID(id);
    console.log(id)
    mongoose.Promise = global.Promise
    mongoose.connect(configDB.url);
    var connection = mongoose.connection;

    connection.on('error', console.error.bind(console, 'connection error:'));
    connection.once('open', function() {
        console.log("entrei")
        mongoose.connection.db.collection('posts', function(err, collection){
            if(!err){
                collection.find({_id:objectID}).toArray(function(err, data){
                    console.log(data)
                    if(!err){
                        res.render('editForm', {
                            title: 'Edit',
                            reqs: data
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
*/

module.exports = router;