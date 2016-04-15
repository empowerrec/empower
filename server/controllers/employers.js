var Employer = require('mongoose').model('Employer');

exports.getEmployers = function (req, res) {
    Employer.find({}).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
        res.send(col);
    });
};

exports.getEmployerById = function (req, res) {
    if (req.params.id == 'profile') {
        console.log(req.user);
        Employer.findOne({ User: req.user }).populate('ModifiedBy').exec(function (err, col) {
            console.log(col);
            res.send(col);
        });
    } else {
        Employer.findOne({ _id: req.params.id }).populate('ModifiedBy').exec(function (err, col) {
            console.log(col);
            res.send(col);
        }); 
    }
    
};

exports.createEmployer = function (req, res, next) {
    var employerData = req.body;

    Employer.create(employerData, function (err, employer) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate Employer');
            }
            res.status(400);

            return res.send({reason: err.toString()});
        }
        res.send(employer);
    });
};

exports.updateEmployer = function (req, res, next) {
    console.log(req.params[0]);
    var employerData = req.body;
    var query = { _id: employerData._id };
    Employer.update(query,employerData, function (err, employer) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate User Name');
            }
            res.status(400);
            return res.send({reason: err.toString()});
        }
        res.send(employer);
    });
};