// load the things we need
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

//Schemas for publication
var UcSchema = new Schema({
    info: {type: Object}
})

module.exports = mongoose.model('UC', UcSchema, 'ucs');