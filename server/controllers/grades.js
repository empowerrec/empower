var Grade = require('mongoose').model('Grade');

exports.getGrades = function (req, res) {
    if (req.query.currentLang) {
        Grade.find({ 'Name.Lang': { "$eq": req.query.currentLang } }, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            res.send(col);
        });
    } else {
        Grade.find({}).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            res.send(col);
        });
    }
};

exports.getGradeById = function (req, res) {
    Grade.findOne({_id:req.params.id}).populate('ModifiedBy').exec(function (err, col) {
        res.send(col);
    });
};

exports.createGrade = function (req, res) {
    var gradeData = req.body;
    
    Grade.create(gradeData, function (err, grade) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate Grade');
            }
            res.status(400);
            
            return res.send({ reason: err.toString() });
        }
        res.send(grade);
    });
};

exports.updateGrade = function (req, res) {
    console.log(req.params[0]);
    var gradeData = req.body;
    var query = { _id: gradeData._id };
    Grade.update(query, gradeData, function (err, grade) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate job Seeker Name');
            }
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(grade);
    });
};