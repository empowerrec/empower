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

exports.createJobSeeker = function (req, res, next) {
    var jobSeekerData = req.body;

    JobSeeker.create(jobSeekerData, function (err, jobSeeker) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate JobSeeker');
            }
            res.status(400);

            return res.send({reason: err.toString()});
        }
        res.send(jobSeeker);
    });
};

exports.updateJobSeeker = function (req, res, next) {

    req.jobSeeker.save(function (err, jobSeeker) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate JobSeeker');
            }
            res.status(400);
            return res.send({reason: err.toString()});
        }
        res.send(jobSeeker);
    });
};