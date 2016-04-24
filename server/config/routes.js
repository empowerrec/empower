var authentication = require('./authentication');
var users = require('../controllers/users');
var employers = require('../controllers/employers');
var vacancies = require('../controllers/vacancies');
var industries = require('../controllers/Industries');
var jobTypes = require('../controllers/jobTypes');
var innerPages = require('../controllers/innerPages');
var categories = require('../controllers/categories');
var languages = require('../controllers/languages');
var countries = require('../controllers/countries');
var cities = require('../controllers/cities');
var curancies = require('../controllers/curancies');

var passport = require('passport');

module.exports = function (app) {
    
    app.use('/api/courses', require('../routes/courses'));
    app.use('/api/jobSeekers', require('../routes/jobSeekers'));
        
    app.get('/api/users', authentication.requiresRole('A'), users.getUsers);
    app.post('/api/users', users.createUser);
    app.put('/api/users', users.updateUser);
           
    app.get('/api/employers', authentication.requiresRole('A'), employers.getEmployers);
    app.post('/api/employers', employers.createEmployer);
    app.put('/api/employers', employers.updateEmployer);
    app.get('/api/employers/:id', employers.getEmployerById);
        
    app.get('/api/vacancies', authentication.requiresRole(['A', 'E']), vacancies.getVacancies);
    app.post('/api/vacancies', vacancies.createVacancy);
    app.put('/api/vacancies', vacancies.updateVacancy);
    app.get('/api/vacancies/:id', vacancies.getVacancyById);
    
    app.get('/api/industries', authentication.requiresRole('A'), industries.getIndustries);
    app.post('/api/industries', industries.createIndustry);
    app.put('/api/industries', industries.updateIndustry);
    app.get('/api/industries/:id', industries.getIndustryById);
    
    app.get('/api/jobTypes', authentication.requiresRole('A'), jobTypes.getJobTypes);
    app.post('/api/jobTypes', jobTypes.createJobType);
    app.put('/api/jobTypes', jobTypes.updateJobType);
    app.get('/api/jobTypes/:id', jobTypes.getJobTypeById);
    
    app.get('/api/categories', authentication.requiresRole('A'), categories.getCategories);
    app.post('/api/categories', categories.createCategory);
    app.put('/api/categories', categories.updateCategory);
    app.get('/api/categories/:id', categories.getCategoryById);
    
    app.get('/api/languages', languages.getLanguages);
    app.post('/api/languages', languages.createLanguage);
    app.put('/api/languages', languages.updateLanguage);
    app.get('/api/languages/:id', languages.getLanguageById);
    
    app.get('/api/countries', countries.getCountries);
    app.post('/api/countries', countries.createCountry);
    app.put('/api/countries', countries.updateCountry);
    app.get('/api/countries/:id', countries.getCountryById);
    
    app.get('/api/curancies', curancies.getCurancies);
    app.post('/api/curancies', curancies.createCurancy);
    app.put('/api/curancies', curancies.updateCurancy);
    app.get('/api/curancies/:id', curancies.getCurancyById);
    
    app.get('/api/cities', cities.getCities);
    app.post('/api/cities', cities.createCity);
    app.put('/api/cities', cities.updateCity);
    app.get('/api/cities/:id', cities.getCityById);
    
    app.get('/api/innerPages', authentication.requiresRole('A'), innerPages.getInnerPages);
    app.post('/api/innerPages', innerPages.createInnerPage);
    app.put('/api/innerPages', innerPages.updateInnerPage);
    app.get('/api/innerPages/:id', innerPages.getInnerPageById);
    
    app.post('/login', authentication.authenticate);
    app.post('/forget', users.sendResetPasswordLink);
    app.get('/reset/:token', users.checkPasswordToken);
    app.post('/logout', function (req, res) {
        req.logout();
        res.end();
    });
    
    app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));
    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/#/profile',
        failureRedirect: '/#/'
    }));
    
    app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
    app.get('/auth/google/callback', passport.authenticate('google', {
        successRedirect: '/#/profile',
        failureRedirect: '/#/'
    }));
    
    app.get('/api/current_user_send_to_client', function (req, res) {
        if (req.user === undefined) {
            // The user is not logged in
            res.json({});
        } else {
            res.json({
                current_user_send_to_client: req.user
            });
        }
    });
    
    // this function call if any route starts with /api/ and not handeled this send to client 404
    app.all('/api/*', function (req, res) {
        res.sendStatus(404);
    });
    
    app.get('/partials/*', function (req, res) {
        res.render('../../public/app/' + req.params[0]);
    });
        
    // this function call if no route handel above and it uses get
    app.get('*', function (req, res) {
        res.render('index');
    });
    
};
