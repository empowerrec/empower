var Course = require('mongoose').model('Course');

exports.getCourses = function (req, res) {
    //Course.find({}).exec(function (err, col) {
    //    res.send(col);
    //});
    if (isAdmin(req)) {
        Course.find({}).populate('TrainingCenter').populate('Specialization').populate('Grade').populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            res.send(col);
        });
    } else if (req.query.jobSeeker) {
        
        console.log('req.user' + req.user);
        Course.find({ JobSeeker: req.query.jobSeeker }).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            res.send(col);
        });
    } else {
        
        console.log('req.user' + req.user);
        Course.find({ CreatedBy: req.user }).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            res.send(col);
        });
    }
};
function isAdmin(req) {
    console.log('UserDetai2' + req.user.UserType);
    
    for (var role in req.user.UserType) {
        console.log('UserDetai3' + req.user.UserType[role]);
        if (req.user.UserType[role] == 'A') {
            return true;
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
    console.log(req.params[0]);
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