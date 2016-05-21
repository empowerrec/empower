var JobRole = require('mongoose').model('JobRole');

//exports.getJobRoles = function (req, res) {
//    if (req.query.currentLang) {
//        JobRole.find({ 'JobRoleName.Lang': { "$eq": req.query.currentLang } }, { 'JobRoleName.$': 1 }).populate('ModifiedBy').populate('CreatedBy').exec(function(err, col) {
//            //console.log(err);
//            res.send(col);

//        });
//    } else {
//        JobRole.find({}).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
//            //console.log(err);
//            res.send(col);

//        });
//    }
//};
exports.getJobRoles = function (req, res) {
    
    var currentPage = parseInt(req.query.currentPage) > 0 ? parseInt(req.query.currentPage) : 1,
        pageSize = parseInt(req.query.pageSize) > 0 ? parseInt(req.query.pageSize) : 10;
    
    JobRole.find(JSON.parse(req.query.query))
            .populate('ModifiedBy').populate('CreatedBy')
            .limit(pageSize).skip(pageSize * (currentPage - 1))
            .exec(function (err, col) {
        JobRole.count(JSON.parse(req.query.query)).exec(function (errr, count) {
            res.send([{ collection: col, allDataCount: count }]);
        });
    });
};
exports.getJobRoleById = function(req, res) {
    JobRole.findOne({_id: req.params.id}).populate('ModifiedBy').exec(function(err, col) {

        console.log(col);

        res.send(col);
    });
};

exports.createJobRole = function (req, res, next) {
    var jobRoleData = req.body;

    JobRole.create(jobRoleData, function (err, jobRole) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate JobRole');
            }
            res.status(400);

            return res.send({reason: err.toString()});
        }
        res.send(jobRole);
    });
};

exports.updateJobRole = function (req, res, next) {
    console.log(req.params[0]);
    var jobRoleData = req.body;
    var query = { _id: jobRoleData._id };
    JobRole.update(query,jobRoleData, function (err, jobRole) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate User Name');
            }
            res.status(400);
            return res.send({reason: err.toString()});
        }
        res.send(jobRole);
    });
};