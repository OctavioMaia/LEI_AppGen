// load all the things we need
var LocalStrategy    = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;

// load up the user model
var User       = require('../models/user');

// load the auth variables
var configAuth = require('./auth'); // use this one for testing

//nodemailer
var nodemailer = require('nodemailer');
var nodemailerSendgrid = require('nodemailer-sendgrid');

module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, email, password, done) {
        if (email)
            email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

        // asynchronous
        process.nextTick(function() {
            User.findOne({ 'local.email' :  email }, function(err, user) {
                // if there are any errors, return the error
                if (err)
                    return done(err);

                if (!user)
                    return done(null, false);
                if (!user.validPassword(password))
                    return done(null, false);
                if (user.local.confirmed!='true')
                    return done(null, false);
                else
                    return done(null, user);
            });
        });
    }));

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, email, password, done) {
        if (email)
            email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

        // asynchronous
        process.nextTick(function() {
            // if the user is not already logged in:
            if (!req.user) {
                User.findOne({ 'local.email' :  email }, function(err, user) {
                    // if there are any errors, return the error
                    if (err)
                        return done(err);

                    // check to see if theres already a user with that email
                    if (user) {
                        return done(null, false);
                    } else {
                        // create the user
                        var newUser             = new User();
                        newUser.local.email     = email;
                        newUser.local.password  = newUser.generateHash(password);
                        newUser.local.name      = req.body.name;
                        newUser.local.age       = req.body.age;
                        newUser.local.type      = 'user';
                        newUser.local.confirmed = 'false'

                        newUser.save(function(err) {
                            if (err)
                                return done(err);
                            else{
                                //confirmation email
                                var transport = nodemailer.createTransport(
                                    nodemailerSendgrid({
                                        apiKey: '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'
                                    })
                                );
                                var mailOptions = {
                                    to: email,
                                    from: 'registration@digitalme.com',
                                    subject: 'Welcome to DigitalMe!',
                                    text: 'You are receiving this because you have registred at DigitalMe.\n\n' +
                                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                                    'http://' + req.headers.host + '/auth/confirm/' + newUser._id + '\n\n' +
                                    'If you did not request this, please ignore this email.\n'
                                };
                                transport.sendMail(mailOptions);                     
                                return done(null, newUser);
                            }
                        });
                    }
                });
            } else {
                // user is already logged in 
                console.log("already logged in")
                return done(null, req.user);
            }
        });
    }));

    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    var fbStrategy = configAuth.facebookAuth;
    fbStrategy.passReqToCallback = true;  // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    passport.use(new FacebookStrategy(fbStrategy,
    function(req, token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function() {
            // check if the user is already logged in
            if (!req.user) {
                User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
                    if (err)
                        return done(err);
                    if (user) {
                        //already registred
                        return done(null, user);
                    }else {
                        // if there is no user, create them
                        var newUser            = new User();
                        newUser.facebook.id    = profile.id;
                        newUser.facebook.token = token;
                        newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                        newUser.facebook.email = (profile.emails[0].value || '').toLowerCase();
                        newUser.facebook.type  = 'user';

                        newUser.save(function(err) {
                            if (err)
                                return done(err);
                                
                            return done(null, newUser);
                        });
                    }
                });
            }else{
                // user is already logged in 
                console.log("already logged in")
                return done(null, req.user);
            }
        });
    }));

    // =========================================================================
    // GOOGLE ==================================================================
    // =========================================================================
    passport.use(new GoogleStrategy({

        clientID        : configAuth.googleAuth.clientID,
        clientSecret    : configAuth.googleAuth.clientSecret,
        callbackURL     : configAuth.googleAuth.callbackURL,
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)

    },
    function(req, token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function() {

            // check if the user is already logged in
            if (!req.user) {
                User.findOne({ 'google.id' : profile.id }, function(err, user) {
                    if (err)
                        return done(err);
                    
                    if (user) {
                        // if there is a user id already but no token (user was linked at one point and then removed)
                        if (!user.google.token) {
                            console.log("exist but not same token")
                            user.google.token = token;
                            user.google.name  = profile.displayName;
                            user.google.email = (profile.emails[0].value || '').toLowerCase(); // pull the first email
                            user.google.type  = profile.type;
                            user.save(function(err) {
                            if (err)
                                return done(err);
                                    
                                return done(null, user);
                            });
                        }
                        return done(null, user);
                    } else {
                        var newUser          = new User();

                        newUser.google.id    = profile.id;
                        newUser.google.token = token;
                        newUser.google.name  = profile.displayName;
                        newUser.google.email = (profile.emails[0].value || '').toLowerCase(); // pull the first email
                        newUser.google.type  = 'user'
                        newUser.save(function(err) {
                            if (err)
                               return done(err);
                                    
                            return done(null, newUser);
                        });
                    }
                });
            }else{
                // user is logged in
                console.log("already logged in")
                return done(null, req.user);
            }
        });
    }));
};