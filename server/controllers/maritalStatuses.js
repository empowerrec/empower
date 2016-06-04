var MaritalStatus = require('mongoose').model('MaritalStatus');

exports.getMaritalStatuses = function (req, res) {
    if (req.query.currentLang) {
        MaritalStatus.find({ 'Name.Lang': { "$eq": req.query.currentLang } }, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            res.send(col);
        });
    } else {
        MaritalStatus.find({}).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            res.send(col);
        });
    }
};

exports.getMaritalStatusById = function(req, res) {
    MaritalStatus.findOne({_id: req.params.id}).populate('ModifiedBy').exec(function(err, col) {
        res.send(col);
    });
};

exports.createMaritalStatus = function (req, res) {
    var maritalStatusData = req.body;

    MaritalStatus.create(maritalStatusData, function (err, maritalStatus) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate MaritalStatus');
            }
            res.status(400);

            return res.send({reason: err.toString()});
        }
        res.send(maritalStatus);
    });
};

exports.updateMaritalStatus = function (req, res) {
    
    var maritalStatusData = req.body;
    var query = { _id: maritalStatusData._id };
    MaritalStatus.update(query,maritalStatusData, function (err, maritalStatus) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate MaritalStatus');
            }
            res.status(400);
            return res.send({reason: err.toString()});
        }
        res.send(maritalStatus);
    });
};