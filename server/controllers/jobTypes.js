var JobType = require('mongoose').model('JobType');

exports.getJobTypes = function (req, res) {
    if (req.query.currentLang) {
        JobType.find({ 'JobTypeName.Lang': { "$eq": req.query.currentLang } }, { 'JobTypeName.$': 1 }).populate('ModifiedBy').populate('CreatedBy').exec(function(err, col) {
            //console.log(err);
            res.send(col);

        });
    } else {
        JobType.find({}).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            //console.log(err);
            res.send(col);

        });
    }
};

exports.getJobTypeById = function(req, res) {
    JobType.findOne({_id: req.params.id}).populate('ModifiedBy').exec(function(err, col) {

        console.log(col);

        res.send(col);
    });
};

exports.createJobType = function (req, res, next) {
    var jobTypeData = req.body;

    JobType.create(jobTypeData, function (err, jobType) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate JobType');
            }
            res.status(400);

            return res.send({reason: err.toString()});
        }
        res.send(jobType);
    });
};

exports.updateJobType = function (req, res, next) {
    console.log(req.params[0]);
    var jobTypeData = req.body;
    var query = { _id: jobTypeData._id };
    JobType.update(query,jobTypeData, function (err, jobType) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate User Name');
            }
            res.status(400);
            return res.send({reason: err.toString()});
        }
        res.send(jobType);
    });
};