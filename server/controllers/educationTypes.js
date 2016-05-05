var EducationType = require('mongoose').model('EducationType');

exports.getEducationTypes = function (req, res) {
    if (req.query.currentLang) {
        EducationType.find({ 'Name.Lang': { "$eq": req.query.currentLang } }, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            res.send(col);
        });
    } else {
        EducationType.find({}).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            res.send(col);
        });
    }
};

exports.getEducationTypeById = function (req, res) {
    EducationType.findOne({_id:req.params.id}).populate('ModifiedBy').exec(function (err, col) {
        res.send(col);
    });
};

exports.createEducationType = function (req, res) {
    var educationTypeData = req.body;
    
    EducationType.create(educationTypeData, function (err, educationType) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate EducationType');
            }
            res.status(400);
            
            return res.send({ reason: err.toString() });
        }
        res.send(educationType);
    });
};

exports.updateEducationType = function (req, res) {
    console.log(req.params[0]);
    var educationTypeData = req.body;
    var query = { _id: educationTypeData._id };
    EducationType.update(query, educationTypeData, function (err, educationType) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate job Seeker Name');
            }
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(educationType);
    });
};