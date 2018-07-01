var express = require('express');
var router  = express.Router();

// HOMEPAGE
router.get('/', function(req, res) {
    res.render('index', {
        title: 'Home'
    });
});

// LOGIN ==============================
router.get('/login', function(req, res) {
    res.render('login', {
        title: 'Login'
    });
});

// LOGOUT ==============================
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

// Insert ==============================
router.get('/insertmenu', function(req, res) {
    res.render('insertmenu', {
        title: 'Insert'
    });
});

// ABOUT ==============================
router.get('/about', function(req, res) {
    res.render('about', {
        title: 'About'
    });
});

// CONTACT ==============================
router.get('/contact', function(req, res) {
    res.render('contact', {
        title: 'Contact'
    });
});

// HELP ==============================
router.get('/help', function(req, res) {
    res.render('help', {
        title: 'Help'
    });
});

// VERIFY ==============================
router.get('/verifyemail', function(req, res) {
    req.session.destroy();
    res.render('verifyemail');
});

// TAKEN ==============================
router.get('/emailtaken', function(req, res) {
    res.render('emailtaken');
});

module.exports = router;