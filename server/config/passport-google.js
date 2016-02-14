var passport = require('passport'),
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    User = require('mongoose').model('User');
var encryption = require('../utilities/encryption');

module.exports = function (config) {

    passport.use(new GoogleStrategy({
            clientID: config.googleAuthentication.clientID,
            clientSecret: config.googleAuthentication.clientSecret,
            callbackURL: config.googleAuthentication.callbackURL,
            passReqToCallback: true,
            profileFields: ['id', 'name', 'emails']
        },
        function (req,token, refreshToken, profile, done) {

            console.log(profile);

            User.findOne({
                'AuthenticationStrategyName': 'google',
                'AuthenticationStrategyId': profile.id
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
                    newUser.AuthenticationStrategyName = 'google';
                    newUser.FirstName = profile.name.givenName;
                    newUser.LastName = profile.name.familyName;
                    newUser.UserName = profile.emails[0].value;
                    var salt, hash;
                    salt = encryption.createSalt();
                    hash = encryption.hashPassword(salt, newUser.UserName);
                    newUser.Salt = salt;
                    newUser.HashedPassword = hash;

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