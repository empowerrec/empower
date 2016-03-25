var Category = require('mongoose').model('Category');

exports.getCategories = function (req, res) {
    Category.find({}).exec(function (err, col) {
        res.send(col);
    });
};

exports.getCategoryById = function (req, res) {
    Category.findOne({_id:req.params.id}).exec(function (err, col) {
        res.send(col);
    });
};