var City = require('mongoose').model('City');

exports.getCities = function (req, res) {
    City.find({}).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
        res.send(col);
    });
};

exports.getCityById = function (req, res) {
    City.findOne({_id:req.params.id}).populate('ModifiedBy').exec(function (err, col) {
        res.send(col);
    });
};

exports.createCity = function (req, res, next) {
    var cityData = req.body;
    
    City.create(cityData, function (err, city) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate City');
            }
            res.status(400);
            
            return res.send({ reason: err.toString() });
        }
        res.send(city);
    });
};

exports.updateCity = function (req, res, next) {
    console.log(req.params[0]);
    var cityData = req.body;
    var query = { _id: cityData._id };
    City.update(query, cityData, function (err, city) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate job Seeker Name');
            }
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(city);
    });
};