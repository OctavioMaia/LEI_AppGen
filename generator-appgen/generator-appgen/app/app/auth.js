var User      = require('../models/user');
var express   = require('express');
var passport  = require('passport');
var router    = express.Router();

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

// locally --------------------------------
// LOGIN ===============================
// show the login form
router.get('/login', function(req, res) {
    res.render('login', {
        title: 'Login'
    });
});

// show the locallogin form
router.get('/locallogin', function(req, res) {
    res.render('locallogin', {
        title: 'Login'
    });
});

// process the locallogin form
router.post('/locallogin', function(req, res, next) {
    passport.authenticate('local-login', function(err, user, info) {
        if (err) { 
            return next(err) 
        }
        if (!user) {
            var err = new Error('User not found.');
            err.status = 400;
            return next(err);
        }
        req.logIn(user, function(err) {
            if (err) { 
                var err = new Error('Wrong login information.');
                err.status = 400;
                return next(err);
            }
            return res.redirect('/profile');
        });
    })(req, res, next);
});

// REGISTER =================================
// show the register form
router.get('/register', function(req, res) {
    res.render('register', {
        title: 'Sign Up'
    });
});

// process the signup form
router.post('/register', passport.authenticate('local-signup', {
    successRedirect: '/verifyemail', // redirect to the secure profile section
    failureRedirect: '/emailtaken' // redirect back to the register page if there is an error
}));

// REGISTER ==============================
router.get('/register', function(req, res) {
    res.render('register', {
        title: 'Local Sign Up'
    });
});

// facebook -------------------------------

// send to facebook to do the authentication
router.get('/facebook', passport.authenticate('facebook', {
    scope: ['public_profile', 'email']
}));

// handle the callback after facebook has authenticated the user
router.get('/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }));

// google ---------------------------------

// send to google to do the authentication
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// the callback after google has authenticated the user
router.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }));

///LOGOUT
router.get('/logout', isLoggedIn,function(req, res, next) {
    if (req.session) {
        // destroy current session and return to home
        req.session.destroy(function(err) {
            if(err) {
                return next(err);
            } else {
                var message = "You have been logged out with success!"
                var href = '/'
                res.render('success', {
                    'Title': 'Success!',
                    message,
                    href
                });
            }
        });
    }
});

// LOCAL CONFIRMATION =========================
router.get('/confirm/:token', function(req, res) {
    User.findOne({_id: req.params.token}, function(err, user) {
        if (!user) {
            console.log("no user with that _id")
        }else{
            user.local.confirmed = 'true'
            user.save(function(err) {
                if (err) {
                    var err = new Error(err);
                    err.status = 400;
                    return next(err);
                } else {
                    req.session.destroy();
                    var message = "Account confimed with success, you may now login!"
                    var href = '/auth/locallogin'
                    res.render('success', {
                        'Title': 'Success!',
                        message,
                        href
                    });
                }
            });
        }
    });
});

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