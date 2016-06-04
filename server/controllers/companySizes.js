var CompanySize = require('mongoose').model('CompanySize');

exports.getCompanySizes = function (req, res) {
    if (req.query.currentLang) {
        CompanySize.find({ 'Name.Lang': { "$eq": req.query.currentLang } }, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').exec(function(err, col) {
            //console.log(err);
            res.send(col);

        });
    } else {
        CompanySize.find({}).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            //console.log(err);
            res.send(col);

        });
    }
};

exports.getCompanySizeById = function(req, res) {
    CompanySize.findOne({_id: req.params.id}).populate('ModifiedBy').exec(function(err, col) {

       

        res.send(col);
    });
};

exports.createCompanySize = function (req, res, next) {
    var companySizeData = req.body;

    CompanySize.create(companySizeData, function (err, companySize) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate CompanySize');
            }
            res.status(400);

            return res.send({reason: err.toString()});
        }
        res.send(companySize);
    });
};

exports.updateCompanySize = function (req, res, next) {
    
    var companySizeData = req.body;
    var query = { _id: companySizeData._id };
    CompanySize.update(query,companySizeData, function (err, companySize) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate User Name');
            }
            res.status(400);
            return res.send({reason: err.toString()});
        }
        res.send(companySize);
    });
};