var passport = require('passport'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

module.exports = function(config) {

    passport.serializeUser(function(user, done) {
        if(user) {
            done(null, user._id);
        }
    });

    passport.deserializeUser(function(id, done) {
        User.findOne({_id:id}).exec(function(err, user) {
            if(user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    });

    require('./passport-local.js')();
    require('./passport-facebook.js')(config);

};