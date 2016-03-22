var User = require('mongoose').model('User');
var encryption = require('../utilities/encryption');

exports.getUsers = function (req, res) {
    User.find({}).exec(function (err, col) {
        res.send(col);
    });
};

exports.getUserById = function(req, res) {
    User.findOne({_id: req.params.id}).exec(function(err, col) {
        res.send(col);
    });
};
var sendMail = require('../config/mailer');

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

            return res.send({reason: err.toString()});
        }
        console.log('Send Message');
        sendMail.sendMail('welcome@empower.com',userData.UserName , 'Welcome To Empower' , 'Welcome To Empower' );
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
    if (req.user._id !== userUpdates._id && !req.user.hsaRole('admin')) {
        res.status(403);
        return res.end();
    }

    req.user.UserName = userUpdates.UserName.toLowerCase();
    req.user.FirstName = userUpdates.FirstName;
    req.user.LastName = userUpdates.LastName;

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
            return res.send({reason: err.toString()});
        }
        res.send(req.user);
    });
};