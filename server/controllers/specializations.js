var Specialization = require('mongoose').model('Specialization');

exports.getSpecializations = function (req, res) {
    if (req.query.currentLang) {
        Specialization.find({ 'Name.Lang': { "$eq": req.query.currentLang } }, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            res.send(col);
        });
    } else {
        Specialization.find({}).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            res.send(col);
        });
    }
};

exports.getSpecializationById = function (req, res) {
    Specialization.findOne({_id:req.params.id}).populate('ModifiedBy').exec(function (err, col) {
        res.send(col);
    });
};

exports.createSpecialization = function (req, res) {
    var specializationData = req.body;
    
    Specialization.create(specializationData, function (err, specialization) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate Specialization');
            }
            res.status(400);
            
            return res.send({ reason: err.toString() });
        }
        res.send(specialization);
    });
};

exports.updateSpecialization = function (req, res) {
    console.log(req.params[0]);
    var specializationData = req.body;
    var query = { _id: specializationData._id };
    Specialization.update(query, specializationData, function (err, specialization) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate job Seeker Name');
            }
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(specialization);
    });
};