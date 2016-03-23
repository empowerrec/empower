var authentication = require('./authentication');
var users = require('../controllers/users');
var courses = require('../controllers/courses');
var roles = require('../controllers/roles');
var passport = require('passport');
var mongoose = require('mongoose');
var Sync = require('sync');

module.exports = function (app) {

    app.get('/api/users', authentication.requiresRole('admin'), users.getUsers);
    app.post('/api/users', users.createUser);
    app.put('/api/users', users.updateUser);

    app.get('/api/roles', roles.getRoles);
    app.get('/api/roles/:id', roles.getRoleById);
    app.get('/api/roles/:roleName', roles.getRoleByRoleName);

    app.get('/api/courses', courses.getCourses);
    app.get('/api/courses/:id', courses.getCourseById);



    app.post('/login', authentication.authenticate);
    app.post('/logout', function (req, res) {
        req.logout();
        res.end();
    });

    app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));
    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/#/profile',
        failureRedirect: '/#/'
    }));

    app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
    app.get('/auth/google/callback', passport.authenticate('google', {
        successRedirect: '/#/profile',
        failureRedirect: '/#/'
    }));

    app.all('/api/*', function (req, res) {
        res.sendStatus(404);
    });

    app.get('/partials/*', function (req, res) {
        res.render('../../public/app/' + req.params[0]);
    });

    app.get('*', function (req, res) {
        res.render('index', {
            bootstrappedUser: req.user,
            bootstrappedUserRoles:arr(req.user)
        });
    });


    var arr = function(user) {
        var rr = [];
        if (user) {
            Sync(function(){
                for(var i in user.Roles)(function () {
                    console.log(i);
                    console.log(user.Roles[i]);
                    rr.push(syncsync.sync(user.Roles[i]));
                })(i);
            });
            return rr;
        }
        return rr;
    };

    var syncsync = function (role_id){
        var Role = mongoose.model('Role');
        Role.findOne({_id: role_id}).exec(function (err, col) {
            if (col) {
                return col.RoleName;
            }
        });
    };
};
