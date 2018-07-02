var configDB            = require('./../config/database.js');
var User                = require('../models/user');
var express             = require('express');
var mongoose            = require('mongoose')
var fileUpload          = require('express-fileupload');
var fs                  = require('fs');
var passport            = require('passport');
var router              = express.Router();

//for file handling
router.use(fileUpload());

// ADMIN ==============================
router.get('/',isAdmin, function(req, res) {
    res.render('admin', {
        title: 'Admin panel'
    });
});

// ADMIN ==============================
router.get('/success', isAdmin,function(req, res) {
    res.render('success', {
        title: 'Success!'
    });
});

// ADMIN DISCARD ==============================
router.get('/discard',function(req, res) {
    return res.redirect('/');
});

//admin POST EXPORT
router.post('/export', isAdmin, function(req, res, next) {
    var db = req.body.collection
    if (db == 'users') {
        User.find({}).select('-_id').lean().exec(function(err, doc) {
            if (!err) {
                fs.writeFile('./json/users.json', JSON.stringify(doc), function(err) {
                    if (err) {
                        return console.log(err);
                    } else {
                        var message = "Users have been exported with success!"
                        var href = '/admin'
                        res.render('success', {
                            'Title': 'Success!',
                            message,
                            href
                        });
                    }
                });
            } else {
                var err = new Error('Could not find the users collection, this shouldnt happen.');
                err.status = 404;
                return next(err);
            }
        });
    }else{
        mongoose.Promise = global.Promise
        mongoose.connect(configDB.url);
        var connection = mongoose.connection;

        connection.on('error', console.error.bind(console, 'connection error'));
        connection.once('open', function() {
            mongoose.connection.db.collection('posts', function(err, collection){
                if(!err){
                    collection.find({}).toArray(function(err, data){
                        if(!err){
                            fs.writeFile('./json/data.json', JSON.stringify(data), function(err) {
                                if (err) {
                                    return console.log(err);
                                } else {
                                    var message = "Data has been exported with success!"
                                    var href = '/admin'
                                    res.render('success', {
                                        'Title': 'Success!',
                                        message,
                                        href
                                    });
                                }
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
    }
});

//admin POST drop
router.post('/drop', isAdmin, function(req, res, next) {
    var db = req.body.collection
    if (db == 'posts') {
        mongoose.Promise = global.Promise
        mongoose.connect(configDB.url);
        var connection = mongoose.connection;

        connection.on('error', console.error.bind(console, 'connection error'));
        connection.once('open', function() {
            mongoose.connection.db.collection('posts', function(err, collection){
                if(!err){
                    collection.drop();
                    var message = "Data has been deleted with success!"
                    var href = '/admin'
                    res.render('success', {
                        'Title': 'Success!',
                            message,
                            href
                        });                    
                }else{
                    console.log(err)
                }
            });
        });
    } else if (db == 'users') {
        User.collection.drop();
        req.session.destroy();
        var message = "Users have been deleted with success!"
        var href = '/'
        res.render('success', {
            'Title': 'Success!',
            message,
            href
        });
    }
});


//admin POST IMPORT USERS
router.post('/importUsers', isAdmin, function(req, res, next) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');
    
    let json = JSON.parse(req.files.users.data);
    User.collection.insert(json, function(err,result) {
        if (err) {
            console.log("duplicate entry: " + json)
        }
        var message = "Users have been imported with success!"
        var href = '/admin'
        res.render('success', {
            'Title': 'Success!',
            message,
            href
        });
     });
});

//admin POST IMPORT POSTS
router.post('/importPosts', isAdmin, function(req, res, next) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');
    
    let json = JSON.parse(req.files.posts.data);
    mongoose.Promise = global.Promise
    mongoose.connect(configDB.url);
    var connection = mongoose.connection;

    connection.on('error', console.error.bind(console, 'connection error'));
    connection.once('open', function() {
        mongoose.connection.db.collection('posts', function(err, collection){
            if(!err){
                collection.insert(json, function(err,result) {
                    if (err) {
                        console.log("duplicate entry: " + json)
                    }
                    var message = "Data has been imported with success!"
                    var href = '/admin'
                    res.render('success', {
                        'Title': 'Success!',
                        message,
                        href
                    });
                });
            }else{
                console.log(err)
            }
        });
    });
});

function isAdmin(req, res, next) {
    if (req.isAuthenticated()) {
        var user
        if (req.user.google.id != undefined) 
            user = req.user.google;
        else if (req.user.facebook.id != undefined) 
            user = req.user.facebook;
        else 
            user = req.user.local;
        
        if (user.type == 'admin') 
            return next();
        else {
            var message = "You must be an admin to access this page."
            res.render('error', {
                'Title': 'Error',
                message
            });
        }
    } else {
        var message = "You must be logged in to access this page."
        res.render('error', {
            'Title': 'Error',
            message
        });
    }
}

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    else{
        var err = new Error('You must be logged in to access this page.');
        err.status = 400;
        return next(err);
    }
    res.redirect('/');
}

module.exports = router;