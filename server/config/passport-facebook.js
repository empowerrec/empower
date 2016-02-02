var passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    User = require('mongoose').model('User');
var encryption = require('../utilities/encryption');

module.exports = function (config) {

    passport.use(new FacebookStrategy({
            clientID: config.facebookAuthentication.clientID,
            clientSecret: config.facebookAuthentication.clientSecret,
            callbackURL: config.facebookAuthentication.callbackURL,
            passReqToCallback: true,
            profileFields: ['id', 'name', 'emails']
        },
        function (req,token, refreshToken, profile, done) {

            User.findOne({
                'AuthenticationStrategyName': 'facebook'
                , 'AuthenticationStrategyId': profile.id
            }, function (err, user) {
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
                    var salt, hash;
                    salt = encryption.createSalt();
                    hash = encryption.hashPassword(salt, newUser.UserName);
                    newUser.Salt = salt;
                    newUser.HashedPassword = hash;

                    console.log(newUser);

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