var User      = require('../models/user');
var express   = require('express');
var passport  = require('passport');
var router    = express.Router();

router.get('/', function(req, res) {
    res.render('register', {
        title: 'Register'
    });
});

module.exports = router;