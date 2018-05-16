// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Schema   = mongoose.Schema;

// define the schema for our user model
var userSchema = new Schema({
    local            : {
        email        : {type: String, required:false},
        password     : {type: String, required:false},
        name         : {type: String, required:false},
        age          : {type: String, required:false},
        gender       : {type: String, required:false},
        address      : {type: String, required:false},
        profession   : {type: String, required:false},
        cnumber      : {type: String, required:false},
        aboutme      : {type: String, required:false},
        confirmed    : {type: String, required:false},
        type         : {type: String, required:false}
    },
    facebook         : {
        id           : {type: String, required:false},
        token        : {type: String, required:false},
        name         : {type: String, required:false},
        age          : {type: String, required:false},
        email        : {type: String, required:false},
        gender       : {type: String, required:false},
        address      : {type: String, required:false},
        profession   : {type: String, required:false},
        cnumber      : {type: String, required:false},
        aboutme      : {type: String, required:false},
        type         : {type: String, required:false}
    },
    google           : {
        id           : {type: String, required:false},
        token        : {type: String, required:false},
        email        : {type: String, required:false},
        name         : {type: String, required:false},
        age          : {type: String, required:false},
        gender       : {type: String, required:false},
        address      : {type: String, required:false},
        profession   : {type: String, required:false},
        cnumber      : {type: String, required:false},
        aboutme      : {type: String, required:false},
        type         : {type: String, required:false}
    }
});

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema, 'users');
