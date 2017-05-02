var PackageFeature = require('mongoose').model('PackageFeature');

exports.getPackageFeatures = function (req, res) {

    var currentPage = parseInt(req.query.currentPage) > 0 ? parseInt(req.query.currentPage) : 1,
        pageSize = parseInt(req.query.pageSize) > 0 ? parseInt(req.query.pageSize) : 10;

    if (req.query.currentLang) {
        PackageFeature.find({ 'Name.Lang': { "$eq": req.query.currentLang } }, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').populate('Feature').exec(function (err, col) {
            res.send(col);
        });
    } else {
        console.log(req.query.query);
        PackageFeature.find(JSON.parse(req.query.query))
            .populate('ModifiedBy').populate('CreatedBy').populate('Feature')
            .limit(pageSize).skip(pageSize * (currentPage - 1))
            .exec(function (err, col) {
                PackageFeature.count(JSON.parse(req.query.query)).exec(function (errr, count) {
                    res.send([{ collection: col, allDataCount: count }]);
                });
            });
    }

};

exports.getPackageFeatureById = function (req, res) {
    PackageFeature.findOne({ _id: req.params.id }).populate('ModifiedBy').exec(function (err, col) {
        res.send(col);
    });
};

exports.createPackageFeature = function (req, res, next) {
    var PackageFeatureData = req.body;

    PackageFeature.create(PackageFeatureData, function (err, PackageFeature) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate PackageFeature');
            }
            res.status(400);

            return res.send({ reason: err.toString() });
        }
        res.send(PackageFeature);
    });
};

exports.getPackageFeatureByName = function (req, res) {

    if (req.query.currentLang && req.query.Confirmed) {
        PackageFeature.find({ 'Name.Lang': { "$eq": req.query.currentLang }, 'Name.Text': { "$regex": req.params.search }, 'Confirmed': { "$eq": req.query.Confirmed } }, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {

            res.send(col);

        });
    } else if (req.query.currentLang) {
        PackageFeature.find({ 'Name.Lang': { "$eq": req.query.currentLang }, 'Name.Text': { "$regex": req.params.search } }, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {

            res.send(col);

        });
    } else {
        PackageFeature.find({ 'Name.Text': { "$regex": req.params.search } }, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {

            res.send(col);

        });
    }


};

exports.updatePackageFeature = function (req, res, next) {

    var PackageFeatureData = req.body;
    var query = { _id: PackageFeatureData._id };
    PackageFeature.update(query, PackageFeatureData, function (err, PackageFeature) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate job Seeker Name');
            }
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(PackageFeature);
    });
};