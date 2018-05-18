var express = require('express');
var router  = express.Router();

// HOMEPAGE
router.get('/', function(req, res) {
    res.render('index', {
        title: 'Home'
    });
});

// LOGIN ==============================
router.get('/auth/login', function(req, res) {
    res.render('register', {
        title: 'Register'
    });
});

module.exports = router;