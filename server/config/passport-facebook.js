var passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    User = require('mongoose').model('User');

module.exports = function (config) {

    passport.use(new FacebookStrategy({
            clientID: config.facebookAuthentication.clientID,
            clientSecret: config.facebookAuthentication.clientSecret,
            callbackURL: config.facebookAuthentication.callbackURL,
            passReqToCallback: true
        },

        function (req, token, refreshToken, profile, done) {
            User.findOne({'AuthenticationStrategyId': profile.id}, function (err, user) {
                if (err) {
                    return done(err);
                }

                if (user) {
                    return done(null, user);
                } else {
                    var newUser = new User();
                    newUser.AuthenticationStrategyId = profile.id;
                    newUser.AuthenticationStrategyToken = token;
                    newUser.AuthenticationStrategyName = 'facebook';
                    newUser.FirstName = profile.name.givenName;
                    newUser.LastName = profile.name.familyName;
                    newUser.UserName = profile.emails[0].value;

                    newUser.save(function (err) {
                        if (err) {
                            throw err;
                        }
                        return done(null, newUser);
                    });
                }
            });
        }));
};