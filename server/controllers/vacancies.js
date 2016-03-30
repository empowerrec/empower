var Vacancy = require('mongoose').model('Vacancy');

exports.getVacancies = function (req, res) {
    Vacancy.find({}).exec(function (err, col) {
        res.send(col);
    });
};

exports.getVacancyById = function (req, res) {
    Vacancy.findOne({_id:req.params.id}).exec(function (err, col) {
        res.send(col);
    });
};


exports.createVacancy = function (req, res, next) {
    var vacancyData = req.body;

    Vacancy.create(vacancyData, function (err, vacancy) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate Vacancy');
            }
            res.status(400);

            return res.send({reason: err.toString()});
        }
        res.send(vacancy);
    });
};

exports.updateVacancy = function (req, res, next) {

    req.vacancy.save(function (err, vacancy) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate Vacancy');
            }
            res.status(400);
            return res.send({reason: err.toString()});
        }
        res.send(vacancy);
    });
};