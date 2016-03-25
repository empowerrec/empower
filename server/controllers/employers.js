var Employer = require('mongoose').model('Employer');

exports.getEmployers = function (req, res) {
    Employer.find({}).exec(function (err, col) {
        res.send(col);
    });
};

exports.getEmployerById = function(req, res) {
    Employer.findOne({_id: req.params.id}).exec(function(err, col) {
        res.send(col);
    });
};

exports.createEmployer = function (req, res, next) {
    var employerData = req.body;

    Employer.create(employerData, function (err, user) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate Employer');
            }
            res.status(400);

            return res.send({reason: err.toString()});
        }

    });
};

exports.updateEmployer = function (req, res, next) {

    req.employer.save(function (err, user) {
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