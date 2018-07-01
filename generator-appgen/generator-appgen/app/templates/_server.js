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
var peg          = require('pegjs');
var pegutil      = require('pegjs-util');
var fs           = require('fs');
var configDB     = require('./config/database.js');
var async        = require("async");

var config = {
    "appName": "<%= appName %>",  
    "db": "<%= dbName %>",  
    "host": "<%= dbHost %>",  
    "user": "<%= dbUser %>",
    "pw": "<%= dbPassword %>",
    "port": "<%= dbPort %>",
    "hasUsers": "<%= hasUsers %>",
    "localLogin": "<%= localLogin %>",
    "collectioncrud": "<%= collectioncrud %>",
    "collectionschema": "<%= collectionschema %>",
    "googleFacebookLogin": "<%= googleFacebookLogin %>"
};

var dbport = (config.port.length > 0) ? ":" + config.port : '';
var login = (config.user.length > 0) ? config.user + ":" + config.pw + "@" : '';
var newDBConfig = "mongodb://" + login + config.host + dbport + "/" + config.db;

var str = "module.exports = { 'url' : '" + newDBConfig + "'};"

fs.writeFileSync('./config/database.js', str, function (err) {
    if (err) 
        throw err;
    console.log('Updated Database config');
});

// configuration ===============================================================
mongoose.Promise = global.Promise
mongoose.connect(configDB.url, function (err, db) {
    if(!err){
        console.log("Connected to database!")  
        // required for passport
        app.use(session({
            secret: 'lei-appgen', // session secret
            resave: true,
            saveUninitialized: true
        }));
        app.use(function (req, res, next) {
            res.locals.appName = config.appName;
            next();
        });
        if(config.hasUsers=='y'){
            // atribute currentuser for login in PUG
            app.use(function (req, res, next) {
                res.locals.hasUsers = true;
                res.locals.currentUser = req.session.passport;
                next();
            });
            db.createCollection('users', function(err, result) {
                if (err) 
                    throw err;
                else
                    console.log("Collection users has been created!");
            });

            if(config.googleFacebookLogin=='y'){
                app.use(function (req, res, next) {
                    res.locals.googleFacebookLogin = true;
                    next();
                });
            }else{
                app.use(function (req, res, next) {
                    res.locals.googleFacebookLogin = false;
                    next();
                });
            }
            if(config.localLogin=='y'){
                app.use(function (req, res, next) {
                    res.locals.localLogin = true;
                    next();
                });
            }else{
                app.use(function (req, res, next) {
                    res.locals.localLogin = false;
                    next();
                });
            }
        }else{
            app.use(function (req, res, next) {
                res.locals.hasUsers = false;
                next();
            });
        }
        if(config.collectioncrud=='y'){
            var res = config.collectionschema.split(',')
            async.each(res, function(item, callback) {
                console.log('Processing file ' + item);
                //SCHEMA
                var parserSchema = peg.generate(fs.readFileSync('./parsers/parseSchema.pegjs', "utf8"))
                var resultSchema = pegutil.parse(parserSchema, fs.readFileSync(item, "utf8"))
                var resSchemas = resultSchema.ast
                
                
                for (var i = 0; i < resSchemas.length; i++) {
                    fs.writeFileSync('./models/' +resSchemas[i][0]+ 'Schema.js', resSchemas[i][1], function (err) {
                        if (err) 
                            throw err;
                        console.log('Created schema: ' + resSchemas[i][0]);
                    });
                }
                
                //ROUTER
                var parserRouter = peg.generate(fs.readFileSync('./parsers/parseRouter.pegjs', "utf8"))
                var resultRouter = pegutil.parse(parserRouter, fs.readFileSync(item, "utf8"))
                var resRouter = resultRouter.ast
                
                
                for (var i = 0; i < resRouter.length; i++) {
                    fs.writeFileSync('./app/' +resRouter[i][0]+ 'Router.js', resRouter[i][1], function (err) {
                        if (err) 
                            throw err;
                        console.log('Created router: ' + resRouter[i][0]);
                    });
                }
                
                //REQUIRES
                var parserReqs = peg.generate(fs.readFileSync('./parsers/parseReqs.pegjs', "utf8"))
                var resultReqs = pegutil.parse(parserReqs, fs.readFileSync(item, "utf8"))
                var fileReqs = './app/requires.js'
                fs.writeFileSync(fileReqs, resultReqs.ast, function (err) {
                    if (err) 
                        throw err;
                    console.log('Created router: ' + fileRouter);
                });
                //OPERATIONS
                /*
                var parserOps = peg.generate(fs.readFileSync('./parsers/parseOps.pegjs', "utf8"))
                var resultOps = pegutil.parse(parserOps, fs.readFileSync(item, "utf8"))
                var fileOps = './app/' + item.split('.')[0] + '2.js'

                fs.writeFile(fileOps, resultOps.ast, function (err) {
                    if (err) 
                        throw err;
                    console.log('Created ops: ' + fileOps);
                });
                */

                console.log('File processed');
                callback();
            }, function(err) {
                // if any of the file processing produced an error, err would equal that error
                if( err ) {
                  // One of the iterations produced an error.
                  // All processing will now stop.
                  console.log('A file failed to process');
                } else {
                  console.log('All files have been processed successfully');
                }
            });
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

        // routes ======================================================================
        passport = require('./config/passport')(passport) //passport for configuration
        var index = require('./app/index.js')
        var auth  = require('./app/auth.js')
        var profile = require('./app/profile.js');
        var list = require('./app/list.js');
        var forms  = require('./app/thoughtRouter.js') //ISTO NAO PODE ESTAR AQUI, TEM DE SER DINAMICO

        app.use('/',index)
        app.use('/auth', auth)
        app.use('/profile', profile);
        app.use('/list', list)
        app.use('/forms', forms) // E ISTO TAMBEM TEM DE SER DINAMICO

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