var EducationalLevel = require('mongoose').model('EducationalLevel');

exports.getEducationalLevels = function (req, res) {
    if (req.query.currentLang) {
        EducationalLevel.find({ 'Name.Lang': { "$eq": req.query.currentLang } }, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            res.send(col);
        });
    } else {
        EducationalLevel.find({}).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            res.send(col);
        });
    }
};

exports.getEducationalLevelById = function (req, res) {
    EducationalLevel.findOne({_id:req.params.id}).populate('ModifiedBy').exec(function (err, col) {
        res.send(col);
    });
};

exports.createEducationalLevel = function (req, res) {
    var educationalLevelData = req.body;
    
    EducationalLevel.create(educationalLevelData, function (err, educationalLevel) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate EducationalLevel');
            }
            res.status(400);
            
            return res.send({ reason: err.toString() });
        }
        res.send(educationalLevel);
    });
};

exports.updateEducationalLevel = function (req, res) {
    
    var educationalLevelData = req.body;
    var query = { _id: educationalLevelData._id };
    EducationalLevel.update(query, educationalLevelData, function (err, educationalLevel) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate job Seeker Name');
            }
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(educationalLevel);
    });
};