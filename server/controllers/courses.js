var Course = require('mongoose').model('Course');

exports.getCourses = function (req, res) {
    var currentPage = parseInt(req.query.currentPage) > 0 ? parseInt(req.query.currentPage) : 1,
        pageSize = parseInt(req.query.pageSize) > 0 ? parseInt(req.query.pageSize) : 10;
    
    if (req.query.jobSeeker) {       
        Course.find(JSON.parse(req.query.query)).populate('TrainingCenter').populate('Specialization').populate('Grade').populate('ModifiedBy')
            .populate('CreatedBy')
            .limit(pageSize)
            .skip(pageSize * (currentPage - 1))
            .exec(function (err, col) {
            Course.count(JSON.parse(req.query.query)).exec(function (errr, count) {
                res.send([{ collection: col, allDataCount: count }]);
            });
        });
    } else if (isAdmin(req)) {
        Course.find({ Deleted : false }).populate('TrainingCenter').populate('Specialization').populate('Grade').populate('ModifiedBy')
            .populate('CreatedBy')
           .limit(pageSize)
            .skip(pageSize * (currentPage - 1))
            .exec(function (err, col) {
            Course.count({ Deleted : false }).exec(function (errr, count) {
                res.send([{ collection: col, allDataCount: count }]);
            });
        });
    } else {
        Course.find({ CreatedBy: req.user, Deleted : false }).populate('TrainingCenter').populate('Specialization').populate('Grade')
            .populate('ModifiedBy').populate('CreatedBy')
            .limit(pageSize)
            .skip(pageSize * (currentPage - 1))
            .exec(function (err, col) {
            Course.count({ CreatedBy: req.user, Deleted : false }).exec(function (errr, count) {
                res.send([{ collection: col, allDataCount: count }]);
            });
        });
    }
};
function isAdmin(req) {
    if (req.user && req.user.UserType) {
        for (var role in req.user.UserType) {
           
            if (req.user.UserType[role] == 'A') {
                return true;
            }
        }
    }
}

exports.getCourseById = function (req, res) {
    Course.findOne({_id:req.params.id}).exec(function (err, col) {
        res.send(col);
    });
};
exports.createCourse = function (req, res, next) {
    var courseData = req.body;
    
    Course.create(courseData, function (err, course) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate Course');
            }
            res.status(400);
            
            return res.send({ reason: err.toString() });
        }
        res.send(course);
    });
};

exports.updateCourse = function (req, res, next) {
    
    var courseData = req.body;
    var query = { _id: courseData._id };
    Course.update(query, courseData, function (err, course) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate User Name');
            }
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(course);
    });
};