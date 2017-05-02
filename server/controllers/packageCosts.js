var PackageCost = require('mongoose').model('PackageCost');

exports.getPackageCosts = function (req, res) {

    var currentPage = parseInt(req.query.currentPage) > 0 ? parseInt(req.query.currentPage) : 1,
        pageSize = parseInt(req.query.pageSize) > 0 ? parseInt(req.query.pageSize) : 10;

    if (req.query.currentLang) {
        PackageCost.find({ 'Name.Lang': { "$eq": req.query.currentLang } }, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').populate('Cost').exec(function (err, col) {
            res.send(col);
        });
    } else {
        console.log(req.query.query);
        PackageCost.find(JSON.parse(req.query.query))
            .populate('ModifiedBy').populate('CreatedBy').populate('Cost')
            .limit(pageSize).skip(pageSize * (currentPage - 1))
            .exec(function (err, col) {
                PackageCost.count(JSON.parse(req.query.query)).exec(function (errr, count) {
                    res.send([{ collection: col, allDataCount: count }]);
                });
            });
    }

};

exports.getPackageCostById = function (req, res) {
    PackageCost.findOne({ _id: req.params.id }).populate('ModifiedBy').exec(function (err, col) {
        res.send(col);
    });
};

exports.createPackageCost = function (req, res, next) {
    var PackageCostData = req.body;

    PackageCost.create(PackageCostData, function (err, PackageCost) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate PackageCost');
            }
            res.status(400);

            return res.send({ reason: err.toString() });
        }
        res.send(PackageCost);
    });
};

exports.getPackageCostByName = function (req, res) {

    if (req.query.currentLang && req.query.Confirmed) {
        PackageCost.find({ 'Name.Lang': { "$eq": req.query.currentLang }, 'Name.Text': { "$regex": req.params.search }, 'Confirmed': { "$eq": req.query.Confirmed } }, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {

            res.send(col);

        });
    } else if (req.query.currentLang) {
        PackageCost.find({ 'Name.Lang': { "$eq": req.query.currentLang }, 'Name.Text': { "$regex": req.params.search } }, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {

            res.send(col);

        });
    } else {
        PackageCost.find({ 'Name.Text': { "$regex": req.params.search } }, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {

            res.send(col);

        });
    }


};

exports.updatePackageCost = function (req, res, next) {

    var PackageCostData = req.body;
    var query = { _id: PackageCostData._id };
    PackageCost.update(query, PackageCostData, function (err, PackageCost) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate job Seeker Name');
            }
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(PackageCost);
    });
};