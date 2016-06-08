var JobSeeker = require('mongoose').model('JobSeeker');

exports.getJobSeekers = function (req, res) {
    //JobSeeker.find({}).populate('Gender').populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
    //    res.send(col);
    //});
    
    var currentPage = parseInt(req.query.currentPage) > 0 ? parseInt(req.query.currentPage) : 1,
        pageSize = parseInt(req.query.pageSize) > 0 ? parseInt(req.query.pageSize) : 10;
    
    JobSeeker.find(JSON.parse(req.query.query))
            .populate('Gender').populate('ModifiedBy').populate('CreatedBy')
            .limit(pageSize).skip(pageSize * (currentPage - 1))
            .exec(function (err, col) {
        JobSeeker.count(JSON.parse(req.query.query)).exec(function (errr, count) {
            res.send([{ collection: col, allDataCount: count }]);
        });
    });
   
};

exports.getJobSeekerById = function (req, res) {
    
    if (req.params.id == 'profile') {
        
        JobSeeker.findOne({ User: req.user }).populate('ModifiedBy').exec(function (err, col) {
            
            res.send(col);
        });
    } else {
        JobSeeker.findOne({ _id: req.params.id }).populate('ModifiedBy').exec(function (err, col) {
            res.send(col);
        });
    }
    
    
};


exports.getJobSeekerByUser = function (req, res) {
    console.log(req.user._id);
    JobSeeker.findOne({ User: req.user._id }).populate('ModifiedBy').exec(function (err, col) {
       
        res.send(col);
    });
};

exports.getJobSeekerByMobileNumber = function (req, res) {
    JobSeeker.findOne({ CreatedBy: req.user, MobileNo: { $nin: [""] } }).populate('ModifiedBy').exec(function (err, col) {
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
    
    var jobSeekerData = req.body;
    var query = { _id: jobSeekerData._id };
    JobSeeker.update(query, jobSeekerData, function (err, jobSeeker) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate job Seeker Name');
            }
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(jobSeeker);
    });
};