var passport = require('passport');

exports.authenticate = function (req, res, next) {
    req.body.username = req.body.username.toLocaleLowerCase();
    passport.authenticate('local', function (err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            res.send({
                success: false
            });
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            res.send({
                success: true,
                user: user
            });
        });
    })(req, res, next);
};

exports.requiresApiLogin = function (req, res, next) {
    if (!req.isAuthenticated()) {
        res.status(403);
        res.end();
    } else {
        next();
    }
};

exports.requiresRole = function (role) {
    return function (req, res, next) {
        if (!req.isAuthenticated() || checkRole(req, role)) {
            res.status(403);
            res.end();
        } else {
            next();
        }
    };
};

function checkRole(req, roles) {
    for (var role in roles) {

        if (req.user.UserType.indexOf(roles[role]) != -1) {
            return false;
        }

    }

    return true;
}