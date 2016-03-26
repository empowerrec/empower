var JobSeeker = require('mongoose').model('JobSeeker');

exports.getJobSeekers = function (req, res) {
    JobSeeker.find({}).exec(function (err, col) {
        res.send(col);
    });
};

exports.getJobSeekerById = function (req, res) {
    JobSeeker.findOne({_id:req.params.id}).exec(function (err, col) {
        res.send(col);
    });
};