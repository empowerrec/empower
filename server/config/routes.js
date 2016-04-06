var authentication = require('./authentication');
var users = require('../controllers/users');
var employers = require('../controllers/employers');
var courses = require('../controllers/courses');
var vacancies = require('../controllers/vacancies');
var passport = require('passport');

module.exports = function (app) {

    app.get('/api/users', authentication.requiresRole('A'), users.getUsers);
    app.post('/api/users', users.createUser);
    app.put('/api/users', users.updateUser);

    app.get('/api/courses', courses.getCourses);
    app.get('/api/courses/:id', courses.getCourseById);

    app.get('/api/employers', authentication.requiresRole('A'), employers.getEmployers);
    app.post('/api/employers', employers.createEmployer);
    app.put('/api/employers', employers.updateEmployer);
    app.get('/api/employers/:id', employers.getEmployerById);

    app.get('/api/vacancies', authentication.requiresRole('A'), vacancies.getVacancies);
    app.post('/api/vacancies', vacancies.createVacancy);
    app.put('/api/vacancies', vacancies.updateVacancy);
    app.get('/api/vacancies/:id', vacancies.getVacancyById);

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
            bootstrappedUser: req.user
        });
    });
};
