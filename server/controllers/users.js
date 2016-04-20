var User = require('mongoose').model('User');
var encryption = require('../utilities/encryption');
var sendMail = require('../config/mailer');
var async = require('async');
var crypto = require('crypto');


exports.getUsers = function (req, res) {
    User.find({}).exec(function (err, col) {
        res.send(col);
    });
};

exports.getUserById = function (req, res) {
    User.findOne({ _id: req.params.id }).exec(function (err, col) {
        res.send(col);
    });
};

exports.createUser = function (req, res, next) {
    var userData = req.body;
    userData.UserName = userData.UserName.toLowerCase();
    userData.Salt = encryption.createSalt();
    userData.HashedPassword = encryption.hashPassword(userData.Salt, userData.Password);
    userData.AuthenticationStrategyName = 'local';
    User.create(userData, function (err, user) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate User Name');
            }
            res.status(400);
            
            return res.send({ reason: err.toString() });
        }
        console.log('Send Message');
        //sendMail.sendMail('info@empowerrec.com',userData.UserName , 'Welcome To Empower' , 'Welcome To Empower' );
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            res.send(user);
        });
    });
};

exports.updateUser = function (req, res, next) {
    var userUpdates = req.body;
    
    if (req.user._id != userUpdates._id && !req.user.hasRole('A')) {
        res.status(403);
        return res.end();
    }
    
    req.user.UserName = userUpdates.UserName.toLowerCase();
    req.user.FirstName = userUpdates.FirstName;
    req.user.LastName = userUpdates.LastName;
    var sess = req.session;
    sess.LastName = userUpdates.LastName;
    //req.session = userUpdates.LastName;
    if (userUpdates.Password && userUpdates.Password.length > 0) {
        req.user.Salt = encryption.createSalt();
        req.user.HashedPassword = encryption.hashPassword(req.user.Salt, userUpdates.Password);
    }
    
    req.user.save(function (err, user) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate User Name');
            }
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(req.user);
    });
};

exports.sendResetPasswordLink = function (req, res, next) {
    async.waterfall([        
        function (done) {
            crypto.randomBytes(20, function (err, buf) {
                var token = buf.toString('hex');
                done(err, token);
            });
        },
        function (token, done) {
            User.findOne({ UserName: req.body.email }, function (err, user) {
                if (!user) {
                    return res.send(400);
                }
                
                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
                
                user.save(function (err1) {
                    done(err1, token, user);
                });
            });
        },
        function (token, user, done) {
            var text = 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                'If you did not request this, please ignore this email and your password will remain unchanged.\n';
            
            sendMail.sendMail('info@empowerrec.com', user.UserName , 'Empower Password Reset' , text , function (err) {
                done(err, 'done');                
                res.send(user);
            });
        }
    ], function (err) {
        if (err) {
            res.status(400);
            return res.send({ reason: err });
        }
    });
};