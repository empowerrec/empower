var Category = require('mongoose').model('Category');

exports.getCategories = function (req, res) {
    Category.find({}).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
        res.send(col);
    });
};

exports.getCategoryById = function (req, res) {
    Category.findOne({_id:req.params.id}).populate('ModifiedBy').exec(function (err, col) {
        res.send(col);
    });
};


exports.createCategory = function (req, res, next) {
    var categoryData = req.body;
    
    Category.create(categoryData, function (err, category) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate Category');
            }
            res.status(400);
            
            return res.send({ reason: err.toString() });
        }
        res.send(category);
    });
};

exports.updateCategory = function (req, res, next) {
    
    var categoryData = req.body;
    var query = { _id: categoryData._id };
    Category.update(query, categoryData, function (err, category) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate job Seeker Name');
            }
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(category);
    });
};