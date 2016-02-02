var Course = require('mongoose').model('Course');

exports.getCourses = function (req, res) {
    Course.find({}).exec(function (err, col) {
        res.send(col);
    });
};

exports.getCourseById = function (req, res) {
    Course.findOne({_id:req.params.id}).exec(function (err, col) {
        res.send(col);
    });
};