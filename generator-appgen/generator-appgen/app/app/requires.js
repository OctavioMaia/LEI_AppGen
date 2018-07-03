
var express      = require('express');
var router              = express.Router();
var ThoughtForm = require('./ThoughtRouter');
var WeddingForm = require('./WeddingRouter');
var TesteForm = require('./TesteRouter');

router.use('/ThoughtForm', ThoughtForm);
router.use('/WeddingForm', WeddingForm);
router.use('/TesteForm', TesteForm);

module.exports = router;
