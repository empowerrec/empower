var VisaStatus = require('mongoose').model('VisaStatus');

exports.getVisaStatuses = function (req, res) {
    if (req.query.currentLang) {
        VisaStatus.find({ 'Name.Lang': { "$eq": req.query.currentLang } }, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            res.send(col);
        });
    } else {
        VisaStatus.find({}).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            res.send(col);
        });
    }
};

exports.getVisaStatusById = function(req, res) {
    VisaStatus.findOne({_id: req.params.id}).populate('ModifiedBy').exec(function(err, col) {
        res.send(col);
    });
};

exports.createVisaStatus = function (req, res) {
    var visaStatusData = req.body;

    VisaStatus.create(visaStatusData, function (err, visaStatus) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate VisaStatus');
            }
            res.status(400);

            return res.send({reason: err.toString()});
        }
        res.send(visaStatus);
    });
};

exports.updateVisaStatus = function (req, res) {
    
    var visaStatusData = req.body;
    var query = { _id: visaStatusData._id };
    VisaStatus.update(query,visaStatusData, function (err, visaStatus) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate VisaStatus');
            }
            res.status(400);
            return res.send({reason: err.toString()});
        }
        res.send(visaStatus);
    });
};