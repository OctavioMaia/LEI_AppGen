var mongoose = require('mongoose'); 
var Schema   = mongoose.Schema; 

var ThoughtSchema = new Schema({
	Author: {type: String},
	Identification: {type: String},
	Location: {type: String},
	Title: {type: String},
	Date: {type: Date},
	Description: {type: String},
	Keywords: {type: String},
	Text: {type: String},
})

 module.exports = mongoose.model('Thought', ThoughtSchema, 'posts');

