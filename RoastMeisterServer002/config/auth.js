// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'        : '1142466149097279', // your App ID
        'clientSecret'    : '63e451c27e992034b53259601ff8c5e3', // your App Secret
        'callbackURL'     : 'http://localhost:8080/auth/facebook/callback'
    }, /* developers.facebook.com/apps/ */

    'twitterAuth' : {
        'consumerKey'        : 'your-consumer-key-here',
        'consumerSecret'     : 'your-client-secret-here',
        'callbackURL'        : 'http://localhost:8080/auth/twitter/callback'
    }, /* https://apps.twitter.com/ */

    'googleAuth' : {
        'clientID'         : 'your-secret-clientID-here',
        'clientSecret'     : 'your-client-secret-here',
        'callbackURL'      : 'http://localhost:8080/auth/google/callback'
    }

};
