var CarLicenceType = require('mongoose').model('CarLicenceType');

exports.getCarLicenceTypes = function (req, res) {
    if (req.query.currentLang) {
        CarLicenceType.find({ 'Name.Lang': { "$eq": req.query.currentLang } }, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            res.send(col);
        });
    } else {
        CarLicenceType.find({}).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            res.send(col);
        });
    }
};

exports.getCarLicenceTypeById = function (req, res) {
    CarLicenceType.findOne({_id:req.params.id}).populate('ModifiedBy').exec(function (err, col) {
        res.send(col);
    });
};

exports.createCarLicenceType = function (req, res) {
    var carLicenceTypeData = req.body;
    
    CarLicenceType.create(carLicenceTypeData, function (err, carLicenceType) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate CarLicenceType');
            }
            res.status(400);
            
            return res.send({ reason: err.toString() });
        }
        res.send(carLicenceType);
    });
};

exports.updateCarLicenceType = function (req, res) {
    
    var carLicenceTypeData = req.body;
    var query = { _id: carLicenceTypeData._id };
    CarLicenceType.update(query, carLicenceTypeData, function (err, carLicenceType) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate job Seeker Name');
            }
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(carLicenceType);
    });
};