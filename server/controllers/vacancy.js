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