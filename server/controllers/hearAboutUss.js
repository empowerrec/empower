var HearAboutUs = require('mongoose').model('HearAboutUs');

exports.getHearAboutUss = function (req, res) {
    if (req.query.currentLang) {
        HearAboutUs.find({ 'Name.Lang': { "$eq": req.query.currentLang } }, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            res.send(col);
        });
    } else {
        HearAboutUs.find({}).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            res.send(col);
        });
    }
};

exports.getHearAboutUsById = function (req, res) {
    HearAboutUs.findOne({_id:req.params.id}).populate('ModifiedBy').exec(function (err, col) {
        res.send(col);
    });
};

exports.createHearAboutUs = function (req, res) {
    var hearAboutUsData = req.body;
    
    HearAboutUs.create(hearAboutUsData, function (err, hearAboutUs) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate HearAboutUs');
            }
            res.status(400);
            
            return res.send({ reason: err.toString() });
        }
        res.send(hearAboutUs);
    });
};

exports.updateHearAboutUs = function (req, res) {
    
    var hearAboutUsData = req.body;
    var query = { _id: hearAboutUsData._id };
    HearAboutUs.update(query, hearAboutUsData, function (err, hearAboutUs) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate job Seeker Name');
            }
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(hearAboutUs);
    });
};