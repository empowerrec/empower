var Religion = require('mongoose').model('Religion');

exports.getReligions = function (req, res) {
    if (req.query.currentLang) {
        Religion.find({ 'Name.Lang': { "$eq": req.query.currentLang } }, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            res.send(col);
        });
    } else {
        Religion.find({}).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            res.send(col);
        });
    }
};

exports.getReligionById = function (req, res) {
    Religion.findOne({_id:req.params.id}).populate('ModifiedBy').exec(function (err, col) {
        res.send(col);
    });
};

exports.createReligion = function (req, res) {
    var religionData = req.body;
    
    Religion.create(religionData, function (err, religion) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate Religion');
            }
            res.status(400);
            
            return res.send({ reason: err.toString() });
        }
        res.send(religion);
    });
};

exports.updateReligion = function (req, res) {
    
    var religionData = req.body;
    var query = { _id: religionData._id };
    Religion.update(query, religionData, function (err, religion) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate job Seeker Name');
            }
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(religion);
    });
};