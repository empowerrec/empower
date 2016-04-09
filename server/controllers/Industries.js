var Industry = require('mongoose').model('Industry');

exports.getIndustries = function (req, res) {
    console.log("ind2");
    Industry.find({}).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
        //console.log(err);
        console.log("ind2");
        res.send(col);

    });
};

exports.getIndustryById = function(req, res) {
    Industry.findOne({_id: req.params.id}).populate('ModifiedBy').exec(function(err, col) {

        console.log(col);

        res.send(col);
    });
};

exports.createIndustry = function (req, res, next) {
    var industryData = req.body;

    Industry.create(industryData, function (err, industry) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate Industry');
            }
            res.status(400);

            return res.send({reason: err.toString()});
        }
        res.send(industry);
    });
};

exports.updateIndustry = function (req, res, next) {
    console.log(req.params[0]);
    var industryData = req.body;
    var query = { _id: industryData._id };
    Industry.update(query,industryData, function (err, industry) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate User Name');
            }
            res.status(400);
            return res.send({reason: err.toString()});
        }
        res.send(industry);
    });
};