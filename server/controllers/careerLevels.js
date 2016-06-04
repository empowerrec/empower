var CareerLevel = require('mongoose').model('CareerLevel');

exports.getCareerLevels = function (req, res) {
    if (req.query.currentLang) {
        CareerLevel.find({ 'Name.Lang': { "$eq": req.query.currentLang } }, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').exec(function(err, col) {
            res.send(col);
        });
    } else {
        CareerLevel.find({}).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            res.send(col);
        });
    }
};

exports.getCareerLevelById = function(req, res) {
    CareerLevel.findOne({_id: req.params.id}).populate('ModifiedBy').exec(function(err, col) {

        

        res.send(col);
    });
};

exports.createCareerLevel = function (req, res, next) {
    var careerLevelData = req.body;

    CareerLevel.create(careerLevelData, function (err, careerLevel) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate CareerLevel');
            }
            res.status(400);

            return res.send({reason: err.toString()});
        }
        res.send(CareerLevel);
    });
};

exports.updateCareerLevel = function (req, res, next) {
    
    var careerLevelData = req.body;
    var query = { _id: careerLevelData._id };
    CareerLevel.update(query,careerLevelData, function (err, careerLevel) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate User Name');
            }
            res.status(400);
            return res.send({reason: err.toString()});
        }
        res.send(careerLevel);
    });
};