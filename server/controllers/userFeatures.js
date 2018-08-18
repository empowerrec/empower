var UserFeature = require('mongoose').model('UserFeature');

exports.getUserFeatures = function (req, res) {

    var currentPage = parseInt(req.query.currentPage) > 0 ? parseInt(req.query.currentPage) : 1,
        pageSize = parseInt(req.query.pageSize) > 0 ? parseInt(req.query.pageSize) : 10;

    if(req.query.currentLang) {
        UserFeature.find({ 'Name.Lang': { "$eq": req.query.currentLang } }, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').populate('User').exec(function (err, col) {
            res.send(col);
        });
    } else {
        UserFeature.find(JSON.parse(req.query.query))
            .populate('ModifiedBy').populate('CreatedBy').populate('User').populate('Feature').populate('Package')
            .limit(pageSize).skip(pageSize * (currentPage - 1))
            .exec(function (err, col) {
                UserFeature.count(JSON.parse(req.query.query)).exec(function (errr, count) {
                    res.send([{ collection: col, allDataCount: count }]);
                });
            });
    }

};

exports.getUserFeatureById = function (req, res) {
    UserFeature.findOne({ _id: req.params.id }).populate('ModifiedBy').populate('User').exec(function (err, col) {
        res.send(col);
    });
};

exports.createUserFeature = function (req, res, next) {
    var UserFeatureData = req.body;

    UserFeature.create(UserFeatureData, function (err, UserFeature) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate UserFeature');
            }
            res.status(400);

            return res.send({ reason: err.toString() });
        }
        res.send(UserFeature);
    });
};

exports.getUserFeatureByName = function (req, res) {

    if (req.query.currentLang && req.query.Confirmed) {
        UserFeature.find({ 'Name.Lang': { "$eq": req.query.currentLang }, 'Name.Text': { "$regex": req.params.search }, 'Confirmed': { "$eq": req.query.Confirmed } }, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {

            res.send(col);

        });
    } else if (req.query.currentLang) {
        UserFeature.find({ 'Name.Lang': { "$eq": req.query.currentLang }, 'Name.Text': { "$regex": req.params.search } }, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {

            res.send(col);

        });
    } else {
        UserFeature.find({ 'Name.Text': { "$regex": req.params.search } }, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {

            res.send(col);

        });
    }


};

exports.updateUserFeature = function (req, res, next) {

    var UserFeatureData = req.body;
    var query = { _id: UserFeatureData._id };
    UserFeature.update(query, UserFeatureData, function (err, UserFeature) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate job Seeker Name');
            }
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(UserFeature);
    });
};

exports.updateUserFeatureByCode = function (req, res, next) {
    var code = req.params.code;
    var user = req.user._id;
    
    UserFeature.findOneAndUpdate({ Code: code, User: user },
        { $inc: { 'UsedFromPoints': 1 } } , { new: true }, function (err, doc) {
        if (err) {
            //next(); 
            console.log("Something wrong when updating data!");
        }
            next();
        console.log(doc);
    });
}



