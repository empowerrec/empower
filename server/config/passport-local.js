var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('mongoose').model('User');

module.exports = function () {

    passport.use(new LocalStrategy(
        function (username, password, done) {
            User.findOne({ UserName: username }).exec(function (err, user) {
                if (user && user.authenticate(password)) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            });
        }
    ));

};