var Industry = require('mongoose').model('Industry');
//Get All industries
exports.getIndustries = function (req, res) {
    
    var currentPage = parseInt(req.query.currentPage) > 0 ? parseInt(req.query.currentPage) : 1,
        pageSize = parseInt(req.query.pageSize) > 0 ? parseInt(req.query.pageSize) : 10;
    if (req.query.currentLang) {

        Industry.find({ 'Name.Lang': { "$eq": req.query.currentLang } }, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').exec(function(err, col) {
            res.send(col);
        });
    } else {
        Industry.find(JSON.parse(req.query.query))
            .populate('ModifiedBy').populate('CreatedBy')
            .limit(pageSize).skip(pageSize * (currentPage - 1))
            .exec(function(err, col) {
                Industry.count(JSON.parse(req.query.query)).exec(function(errr, count) {
                    res.send([{ collection: col, allDataCount: count }]);
                });
            });
    }
};

exports.getIndustryById = function(req, res) {
    Industry.findOne({_id: req.params.id}).populate('ModifiedBy').exec(function(err, col) {

        

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