var User = require('mongoose').model('User');
var encryption = require('../utilities/encryption');
var sendMail = require('../config/mailer');
var async = require('async');
var crypto = require('crypto');

//exports.getUsers = function (req, res) {
//    User.find({}).exec(function (err, col) {
//        res.send(col);
//    });
//};

exports.getUsers = function (req, res) {
    
    var currentPage = parseInt(req.query.currentPage) > 0 ? parseInt(req.query.currentPage) : 1,
        pageSize = parseInt(req.query.pageSize) > 0 ? parseInt(req.query.pageSize) : 10;
    
    if (req.query.currentLang) {
        User.find({ 'Name.Lang': { "$eq": req.query.currentLang } }, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            res.send(col);
        });
    } else {
        User.find(JSON.parse(req.query.query))
            .populate('ModifiedBy').populate('CreatedBy')
            .limit(pageSize).skip(pageSize * (currentPage - 1))
            .exec(function (err, col) {
                User.count(JSON.parse(req.query.query)).exec(function (errr, count) {
                res.send([{ collection: col, allDataCount: count }]);
            });
        });
    }
    
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
    userData.Deleted = false;
    User.create(userData, function (err, user) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate User Name');
            }
            res.status(400);
            
            return res.send({ reason: err.toString() });
        }
        console.log('Send Message');
        sendMail.sendMail('ali7ussein@live.com',userData.UserName , 'Welcome To Empower' , 'Welcome To Empower' );
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            res.send(user);
        });
    });
};

exports.updateUser = function (req, res) {
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

exports.sendResetPasswordLink = function (req, res) {
    
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
                    return res.send(null);
                }
                
                user.ResetPasswordToken = token;
                user.ResetPasswordExpires = Date.now() + 3600000; // 1 hour
                
                user.save(function (err) {
                    done(err, token, user);
                });
            });
        },
        function (token, user, done) {
            var email = require('mailer');

            var text = 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                        'http://' + req.headers.host + '/#/reset/' + token + '\n\n' +
                        'If you did not request this, please ignore this email and your password will remain unchanged.\n';
            
            
            var mailOption = {
                ssl: true,
                host: "e22.ehosts.com",              // smtp server hostname
                port: "465",                     // smtp server port
                domain: "[https://empowerrec.herokuapp.com]",            // domain used by client to identify itself to server
                to: user.UserName,
                from: 'ali7ussein@live.com',
                subject: 'Empower Password Reset',
                body: text,
                authentication: "login",        // auth login is supported; anything else is no auth
                username: "ali7ussein@live.com",       // Base64 encoded username
                password: "abc@147852"        // Base64 encoded password
   
            };
            
            email.send(mailOption, function (err) {
                done(err, user, 'done');
            });
        }
    ], function (err, user) {
        if (err) {
            res.status(400);
            return res.send({ reason: err });
        } else {
            res.send(user);
        }
    });

};

exports.checkPasswordToken = function (req, res) {
    async.waterfall([
        function () {
            User.findOne({ ResetPasswordToken: req.params.token, ResetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
                if (!user) {
                    return res.send({ reason: 'error' });
                }
                return res.send(user);
            });
        }
    ]);
};

exports.updatePassword = function (req, res) {
    async.waterfall([
     
        function (done) {
            User.findOne({ ResetPasswordToken: req.body.token, ResetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
                if (!user) {
                    return res.send(400,{ error : 'This link is expired please make another link' });
                }
                
                user.ResetPasswordToken = undefined;
                user.ResetPasswordExpires = undefined;
                user.Salt = encryption.createSalt();
                user.HashedPassword = encryption.hashPassword(user.Salt, req.body.password);
                
                user.save(function (err) {
                    req.logIn(user, function (err) {
                        
                        var email = require('mailer');

                        var text = 'Hello,\n\n' +
                               'This is a confirmation that the password for your account ' 
                               + user.UserName + ' has just been changed.\n';
                        
                        var mailOption = {
                            ssl: true,
                            host: "e22.ehosts.com",              // smtp server hostname
                            port: "465",                     // smtp server port
                            domain: "[https://empowerrec.herokuapp.com]",            // domain used by client to identify itself to server
                            to: user.UserName,
                            from: 'ali7ussein@live.com',
                            subject: 'Empower your password has been changed',
                            body: text,
                            authentication: "login",        // auth login is supported; anything else is no auth
                            username: "ali7ussein@live.com",       // Base64 encoded username
                            password: "abc@147852"        // Base64 encoded password   
                        };
                        
                        email.send(mailOption, function (err) {
                            done(err, user, 'done');
                        });
                    });
                });
            });
        }], function (err, user) {
        if (err) {
            res.status(400);
            res.send({ reason: err });
        } else {
            res.send({ success: true, user: user });
        }
    });
};