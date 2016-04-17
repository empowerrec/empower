var Country = require('mongoose').model('Country');

exports.getCountries = function (req, res) {
    Country.find({}).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
        res.send(col);
    });
};

exports.getCountryById = function (req, res) {
    Country.findOne({_id:req.params.id}).populate('ModifiedBy').exec(function (err, col) {
        res.send(col);
    });
};

exports.createCountry = function (req, res, next) {
    var countryData = req.body;
    
    Country.create(countryData, function (err, country) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate Country');
            }
            res.status(400);
            
            return res.send({ reason: err.toString() });
        }
        res.send(country);
    });
};

exports.updateCountry = function (req, res, next) {
    console.log(req.params[0]);
    var countryData = req.body;
    var query = { _id: countryData._id };
    Country.update(query, countryData, function (err, country) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate job Seeker Name');
            }
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(country);
    });
};