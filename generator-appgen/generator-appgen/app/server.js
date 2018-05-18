var express      = require('express');
var app          = express();
var port         = 8080;
var mongoose     = require('mongoose');
var passport     = require('passport');
var path         = require('path');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var pug          = require('pug');

var config = {
    "db": "appgen",  
    "host": "localhost",  
    "user": "",
    "pw": "",
    "port": "27017",
    "hasUsers": "n",
    "collectionname": "asvsdfsadsadsajfas",
    "collectioncrud": "y"
};
  
var dbport = (config.port.length > 0) ? ":" + config.port : '';
var login = (config.user.length > 0) ? config.user + ":" + config.pw + "@" : '';
var configDB = "mongodb://" + login + config.host + dbport + "/" + config.db;   

// configuration ===============================================================
mongoose.Promise = global.Promise
mongoose.connect(configDB, function (err, db) {
    if(!err){
        console.log("Connected to database!")  
        // required for passport
        app.use(session({
            secret: 'lei-appgen', // session secret
            resave: true,
            saveUninitialized: true
        }));

        if(config.hasUsers=='y'){
            // atribute currentuser for login in PUG
            app.use(function (req, res, next) {
                res.locals.currentUser = req.session.passport;
                next();
            });
            db.createCollection('users', function(err, result) {
                if (err) 
                    throw err;
                else
                    console.log("Collection users has been created!");
            });
        }
        if(config.collectionname!=''){
            db.createCollection(config.collectionname, function(err, result) {
            if (err) 
                throw err;
            else
                console.log("Collection " + config.collectionname + " has been created!");
            });
        }
        if(config.collectioncrud=='y'){ 
        }

        // express setup
        app.use(morgan('dev')); // dev logging
        app.use(cookieParser()); // cookies for auth
        app.use(bodyParser.json()); // parsing html forms
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(express.static(__dirname));
        app.use(passport.initialize());
        app.use(passport.session()); // persistent login sessions

        // view engine setup
        //console.log(path.join(__dirname, 'views'))
        app.engine('pug', require('pug').__express)
        app.set('views', path.join(__dirname, 'views'));
        app.set('view engine', 'pug');

        var index = require('./app/index.js')
        app.use('/',index)

        // routes ======================================================================
        passport = require('./config/passport')(passport); //passport for configuration
        
        //error handling
        app.use(function(req, res, next) {
            var err = new Error('File Not Found');
            err.status = 404;
            next(err);
        });

        app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: {}
            });
        });

        // launch 
        app.listen(port);
        console.log('Server listening on port ' + port);

        module.exports = app;
    }else{
        console.log('Error connecting to DB!')
    }
});