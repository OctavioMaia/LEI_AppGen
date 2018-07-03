var mongoose = require('mongoose'); 
var Schema   = mongoose.Schema; 

var TesteSchema = new Schema({
	Type : {type: String},
	Author: {type: String},
	Text: {type: String},
})

 module.exports = mongoose.model('Teste', TesteSchema, 'posts');

