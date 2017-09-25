var Nationality = require('mongoose').model('Nationality');

exports.getNationalities = function (req, res) {
    if (req.query.currentLang) {
        Nationality.find({ 'Name.Lang': { "$eq": req.query.currentLang } }, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            
            res.send(col);

        });
    } else {
        Nationality.find({}).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            
            res.send(col);

        });
    }
    

};

exports.getNationalityById = function (req, res) {
    Nationality.findOne({_id:req.params.id}).populate('ModifiedBy').exec(function (err, col) {
        res.send(col);
    });
};

exports.createNationality = function (req, res, next) {
    var NationalityData = req.body;
    
    Nationality.create(NationalityData, function (err, Nationality) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate Nationality');
            }
            res.status(400);
            
            return res.send({ reason: err.toString() });
        }
        res.send(Nationality);
    });
};

exports.updateNationality = function (req, res, next) {
    console.log(req.params[0]);
    var NationalityData = req.body;
    var query = { _id: NationalityData._id };
    Nationality.update(query, NationalityData, function (err, Nationality) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate job Seeker Name');
            }
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(Nationality);
    });
};