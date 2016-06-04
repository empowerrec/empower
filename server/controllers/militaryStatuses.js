var MilitaryStatus = require('mongoose').model('MilitaryStatus');

exports.getMilitaryStatuses = function (req, res) {
    if (req.query.currentLang) {
        MilitaryStatus.find({ 'Name.Lang': { "$eq": req.query.currentLang } }, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            res.send(col);
        });
    } else {
        MilitaryStatus.find({}).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            res.send(col);
        });
    }
};

exports.getMilitaryStatusById = function(req, res) {
    MilitaryStatus.findOne({_id: req.params.id}).populate('ModifiedBy').exec(function(err, col) {
        res.send(col);
    });
};

exports.createMilitaryStatus = function (req, res) {
    var militaryStatusData = req.body;

    MilitaryStatus.create(militaryStatusData, function (err, militaryStatus) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate MilitaryStatus');
            }
            res.status(400);

            return res.send({reason: err.toString()});
        }
        res.send(militaryStatus);
    });
};

exports.updateMilitaryStatus = function (req, res) {
    
    var militaryStatusData = req.body;
    var query = { _id: militaryStatusData._id };
    MilitaryStatus.update(query,militaryStatusData, function (err, militaryStatus) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate MilitaryStatus');
            }
            res.status(400);
            return res.send({reason: err.toString()});
        }
        res.send(militaryStatus);
    });
};