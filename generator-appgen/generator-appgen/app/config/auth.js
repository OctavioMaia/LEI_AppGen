// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'        : '2060340124222209', // your App ID
        'clientSecret'    : 'ece08ef2dee8f2d419566f6ec5a0f3cb', // your App Secret
        'callbackURL'     : 'http://localhost:8080/auth/facebook/callback',
        'profileURL'      : 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
        'profileFields'   : ['id', 'email', 'name'] // For requesting permissions from Facebook API

    },

    'googleAuth' : {
        'clientID'         : '205514991953-mvubjl67u1qio5cmvecuhg7uph5btqcc.apps.googleusercontent.com',
        'clientSecret'     : 'GeLno1PvtUXeXvRbuSGrOxTI',
        'callbackURL'      : 'http://localhost:8080/auth/google/callback'
    },

    'secretToken' : 'lei-appgen'

};
