var JobType = require('mongoose').model('JobType');

exports.getJobTypes = function (req, res) {
    var currentPage = parseInt(req.query.currentPage) > 0 ? parseInt(req.query.currentPage) : 1,
        pageSize = parseInt(req.query.pageSize) > 0 ? parseInt(req.query.pageSize) : 10;
    console.log("Current Page : ", req.query.currentLang);
    if (req.query.currentLang) {
        
        JobType.find({ 'Name.Lang': { "$eq": req.query.currentLang } }, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            res.send(col);
        });
    } else {
        JobType.find(JSON.parse(req.query.query))
            .populate('ModifiedBy').populate('CreatedBy')
            .limit(pageSize).skip(pageSize * (currentPage - 1))
            .exec(function (err, col) {
            JobType.count(JSON.parse(req.query.query)).exec(function (errr, count) {
                res.send([{ collection: col, allDataCount: count }]);
            });
        });
    }
   
};

exports.getJobTypeById = function(req, res) {
    JobType.findOne({_id: req.params.id}).populate('ModifiedBy').exec(function(err, col) {

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