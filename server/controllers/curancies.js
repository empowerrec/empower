var Curancy = require('mongoose').model('Curancy');

exports.getCurancies = function (req, res) {
    if (req.query.currentLang) {
        Curancy.find({ 'CurancyName.Lang': { "$eq": req.query.currentLang } }, { 'CurancyName.$': 1 }).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            console.log(req.query.currentLang);
            res.send(col);

        });
    } else {
        Curancy.find({}).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            console.log(req.query.currentLang);
            res.send(col);

        });
    }
    

};

exports.getCurancyById = function (req, res) {
    Curancy.findOne({_id:req.params.id}).populate('ModifiedBy').exec(function (err, col) {
        res.send(col);
    });
};

exports.createCurancy = function (req, res, next) {
    var CurancyData = req.body;
    
    Curancy.create(CurancyData, function (err, Curancy) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate Curancy');
            }
            res.status(400);
            
            return res.send({ reason: err.toString() });
        }
        res.send(Curancy);
    });
};

exports.updateCurancy = function (req, res, next) {
    console.log(req.params[0]);
    var CurancyData = req.body;
    var query = { _id: CurancyData._id };
    Curancy.update(query, CurancyData, function (err, Curancy) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate job Seeker Name');
            }
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(Curancy);
    });
};