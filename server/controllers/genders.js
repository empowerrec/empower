var Gender = require('mongoose').model('Gender');

exports.getGenders = function (req, res) {
    if (req.query.currentLang) {
        Gender.find({ 'Name.Lang': { "$eq": req.query.currentLang } }, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            res.send(col);
        });
    } else {
        Gender.find({}).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            res.send(col);
        });
    }
};

exports.getGenderById = function (req, res) {
    Gender.findOne({_id:req.params.id}).populate('ModifiedBy').exec(function (err, col) {
        res.send(col);
    });
};

exports.createGender = function (req, res) {
    var genderData = req.body;
    
    Gender.create(genderData, function (err, gender) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate Gender');
            }
            res.status(400);
            
            return res.send({ reason: err.toString() });
        }
        res.send(gender);
    });
};

exports.updateGender = function (req, res) {
    
    var genderData = req.body;
    var query = { _id: genderData._id };
    Gender.update(query, genderData, function (err, gender) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate job Seeker Name');
            }
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(gender);
    });
};