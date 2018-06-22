var mongoose = require('mongoose'); 
var Schema   = mongoose.Schema; 

var ThoughtSchema = new Schema({
author: {type: String},
ident: {type: String},
location: {type: String},
privacy: {type: String},
title: {type: String},
date: {type: Date},
pubdate: {type: Date},
description: {type: String},
type: {type: String},
keywords: {type: String},
text: {type: String},
comments: {type: String},
})

 module.exports = mongoose.model('Thought', ThoughtSchema, 'posts');