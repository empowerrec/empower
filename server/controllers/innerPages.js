var InnerPage = require('mongoose').model('InnerPage');

exports.getInnerPages = function (req, res) {
    InnerPage.find({}).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
        res.send(col);
    });
};

exports.getInnerPageById = function(req, res) {
    InnerPage.findOne({_id: req.params.id}).populate('ModifiedBy').exec(function(err, col) {
        console.log(col);
        res.send(col);
    });
};

exports.createInnerPage = function (req, res, next) {
    var innerPageData = req.body;

    InnerPage.create(innerPageData, function (err, innerPage) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate Employer');
            }
            res.status(400);

            return res.send({reason: err.toString()});
        }
        res.send(innerPage);
    });
};

exports.updateInnerPage = function (req, res, next) {
    console.log(req.params[0]);
    var innerPageData = req.body;
    var query = { _id: innerPageData._id };
    InnerPage.update(query, innerPageData, function (err, innerPageData) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate innerPageData');
            }
            res.status(400);
            return res.send({reason: err.toString()});
        }
        res.send(innerPageData);
    });
};