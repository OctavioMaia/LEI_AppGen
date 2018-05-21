// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'        : '772972342897636', // your App ID
        'clientSecret'    : 'b9915731ca479e3cc7675dfe9e650e38', // your App Secret
        'callbackURL'     : 'http://localhost:8080/auth/facebook/callback',
        'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
        'profileFields'   : ['id', 'email', 'name'] // For requesting permissions from Facebook API

    },

    'googleAuth' : {
        'clientID'         : '142061558149-lpfuh54k06shg9vu3fee9qqkp19t1rss.apps.googleusercontent.com',
        'clientSecret'     : 'PFmCiyiU8UU7iTRKM4p7k8Md',
        'callbackURL'      : 'http://localhost:8080/auth/google/callback'
    },

    'secretToken' : 'lei-appgen'

};
