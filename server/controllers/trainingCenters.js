var TrainingCenter = require('mongoose').model('TrainingCenter');

exports.getTrainingCenters = function (req, res) {
    if (req.query.currentLang) {
        TrainingCenter.find({ 'Name.Lang': { "$eq": req.query.currentLang }}).populate('ModifiedBy').populate('CreatedBy').exec(function(err, col) {
            res.send(col);
        });
    } else {
        TrainingCenter.find({}).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            res.send(col);
        });
    }
};

exports.getTrainingCenterById = function (req, res) {
    TrainingCenter.findOne({_id:req.params.id}).populate('ModifiedBy').exec(function (err, col) {
        res.send(col);
    });
};

exports.createTrainingCenter = function (req, res, next) {
    var trainingCenterData = req.body;
    
    TrainingCenter.create(trainingCenterData, function (err, trainingCenter) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate TrainingCenter');
            }
            res.status(400);
            
            return res.send({ reason: err.toString() });
        }
        res.send(trainingCenter);
    });
};

exports.updateTrainingCenter = function (req, res, next) {
    console.log(req.params[0]);
    var trainingCenterData = req.body;
    var query = { _id: trainingCenterData._id };
    TrainingCenter.update(query, trainingCenterData, function (err, trainingCenter) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate job Seeker Name');
            }
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(trainingCenter);
    });
};