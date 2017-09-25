var SubUserFeature = require('mongoose').model('SubUserFeature');

exports.getSubUserFeatures = function (req, res) {

    var currentPage = parseInt(req.query.currentPage) > 0 ? parseInt(req.query.currentPage) : 1,
        pageSize = parseInt(req.query.pageSize) > 0 ? parseInt(req.query.pageSize) : 10;

    if(req.query.currentLang) {
        SubUserFeature.find({ 'Name.Lang': { "$eq": req.query.currentLang } }, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').populate('User').exec(function (err, col) {
            res.send(col);
        });
    } else {
        SubUserFeature.find(JSON.parse(req.query.query))
            .populate('ModifiedBy').populate('CreatedBy').populate('User').populate('Feature')
            .limit(pageSize).skip(pageSize * (currentPage - 1))
            .exec(function (err, col) {
                SubUserFeature.count(JSON.parse(req.query.query)).exec(function (errr, count) {
                    res.send([{ collection: col, allDataCount: count }]);
                });
            });
    }

};

exports.getSubUserFeatureById = function (req, res) {
    SubUserFeature.findOne({ _id: req.params.id }).populate('ModifiedBy').populate('User').exec(function (err, col) {
        res.send(col);
    });
};

exports.createSubUserFeature = function (req, res, next) {
    var SubUserFeatureData = req.body;

    SubUserFeature.create(SubUserFeatureData, function (err, SubUserFeature) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate SubUserFeature');
            }
            res.status(400);

            return res.send({ reason: err.toString() });
        }
        res.send(SubUserFeature);
    });
};

exports.getSubUserFeatureByName = function (req, res) {

    if (req.query.currentLang && req.query.Confirmed) {
        SubUserFeature.find({ 'Name.Lang': { "$eq": req.query.currentLang }, 'Name.Text': { "$regex": req.params.search }, 'Confirmed': { "$eq": req.query.Confirmed } }, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {

            res.send(col);

        });
    } else if (req.query.currentLang) {
        SubUserFeature.find({ 'Name.Lang': { "$eq": req.query.currentLang }, 'Name.Text': { "$regex": req.params.search } }, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {

            res.send(col);

        });
    } else {
        SubUserFeature.find({ 'Name.Text': { "$regex": req.params.search } }, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {

            res.send(col);

        });
    }


};

exports.updateSubUserFeature = function (req, res, next) {

    var SubUserFeatureData = req.body;
    var query = { _id: SubUserFeatureData._id };
    SubUserFeature.update(query, SubUserFeatureData, function (err, SubUserFeature) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate job Seeker Name');
            }
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(SubUserFeature);
    });
};