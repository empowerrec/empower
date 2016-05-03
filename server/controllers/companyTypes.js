var CompanyType = require('mongoose').model('CompanyType');

exports.getCompanyTypes = function (req, res) {
    if (req.query.currentLang) {
        CompanyType.find({ 'Name.Lang': { "$eq": req.query.currentLang } }, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').exec(function(err, col) {
            //console.log(err);
            res.send(col);

        });
    } else {
        CompanyType.find({}).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            //console.log(err);
            res.send(col);

        });
    }
};

exports.getCompanyTypeById = function(req, res) {
    CompanyType.findOne({_id: req.params.id}).populate('ModifiedBy').exec(function(err, col) {

        console.log(col);

        res.send(col);
    });
};

exports.createCompanyType = function (req, res, next) {
    var companyTypeData = req.body;

    CompanyType.create(companyTypeData, function (err, companyType) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate CompanyType');
            }
            res.status(400);

            return res.send({reason: err.toString()});
        }
        res.send(CompanyType);
    });
};

exports.updateCompanyType = function (req, res, next) {
    console.log(req.params[0]);
    var companyTypeData = req.body;
    var query = { _id: companyTypeData._id };
    CompanyType.update(query,companyTypeData, function (err, companyType) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate User Name');
            }
            res.status(400);
            return res.send({reason: err.toString()});
        }
        res.send(companyType);
    });
};