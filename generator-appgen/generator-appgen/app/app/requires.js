
var express      = require('express');
var router              = express.Router();
var ThoughtForm = require('./ThoughtRouter');
var WeddingForm = require('./WeddingRouter');

router.use('/ThoughtForm', ThoughtForm);
router.use('/WeddingForm', WeddingForm);

module.exports = router;
