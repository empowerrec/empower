var UserPackage = require('mongoose').model('UserPackage');
var UserFeature = require('mongoose').model('UserFeature');
var PackageFeature = require('mongoose').model('PackageFeature');
var async = require('async');


exports.getUserPackages = function (req, res) {

    var currentPage = parseInt(req.query.currentPage) > 0 ? parseInt(req.query.currentPage) : 1,
        pageSize = parseInt(req.query.pageSize) > 0 ? parseInt(req.query.pageSize) : 10;

    if (req.query.currentLang) {
        UserPackage.find({ 'Name.Lang': { "$eq": req.query.currentLang } }, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').populate('User').exec(function (err, col) {
            res.send(col);
        });
    } else {
        UserPackage.find(JSON.parse(req.query.query))
            .populate('ModifiedBy').populate('CreatedBy').populate('User').populate('Package')
            .limit(pageSize).skip(pageSize * (currentPage - 1))
            .exec(function (err, col) {
                UserPackage.count(JSON.parse(req.query.query)).exec(function (errr, count) {
                    res.send([{ collection: col, allDataCount: count }]);
                });
            });
    }

};

exports.getUserPackageById = function (req, res) {
    UserPackage.findOne({ _id: req.params.id }).populate('ModifiedBy').populate('User').exec(function (err, col) {
        res.send(col);
    });
};

exports.createUserPackage = function (req, res, next) {
    var UserPackageData = req.body;
    PackageFeature.find({ $and: [{ 'Package': { "$eq": UserPackageData.Package } }, { 'Deleted': { "$eq": false } }] })
        .populate('Feature').populate('User').exec(function (err, col) {

            async.each(col, function (entry, next) {
                var uf = new UserFeature();
                uf.Points = entry.Points;
                uf.Feature = entry.Feature;
                uf.FeatureType = entry.Feature.Type;
                uf.Package = UserPackageData.Package;
                uf.User = UserPackageData.User;
                uf.ExpiryDate = UserPackageData.ExpiryDate;
                uf.DistrbuitedForSubUsers = 0;
                uf.UsedFromPoints = 0;
                uf.Deleted = false;
                uf.CreatedBy = UserPackageData.CreatedBy;

                UserFeature.create(uf, function (err, UserFeature) {
                    if (err) {
                        if (err.toString().indexOf('E11000') > -1) {
                            err = new Error('Duplicate UserFeature');
                        }
                        res.status(400);

                        return res.send({ reason: err.toString() });
                    }
                    next();
                });
            }, function (err) {
                UserPackage.find({ 'Deleted': { "$eq": false } }).exec(function (err, col) {
                    async.each(col, function (entry, next) {
                        entry.Deleted = true;
                        var query = { _id: entry._id };
                        UserPackage.update(query,entry, function (err, UserPackage) {
                            if (err) {
                                if (err.toString().indexOf('E11000') > -1) {
                                    err = new Error('Duplicate job Seeker Name');
                                }
                                res.status(400);
                                return res.send({ reason: err.toString() });
                            }
                            next();
                        });

                    }, function (err) {
                        delete UserPackageData._id;
                        UserPackage.create(UserPackageData, function (err, UserPackage) {
                            if (err) {
                                if (err.toString().indexOf('E11000') > -1) {
                                    err = new Error('Duplicate UserPackage');
                                }
                                res.status(400);

                                return res.send({ reason: err.toString() });
                            }
                            res.send(UserPackage);
                        });
                        
                    });

                });
                
            });
            
        });
};

exports.getUserPackageByName = function (req, res) {

    if (req.query.currentLang && req.query.Confirmed) {
        UserPackage.find({ 'Name.Lang': { "$eq": req.query.currentLang }, 'Name.Text': { "$regex": req.params.search }, 'Confirmed': { "$eq": req.query.Confirmed } }, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {

            res.send(col);

        });
    } else if (req.query.currentLang) {
        UserPackage.find({ 'Name.Lang': { "$eq": req.query.currentLang }, 'Name.Text': { "$regex": req.params.search } }, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {

            res.send(col);

        });
    } else {
        UserPackage.find({ 'Name.Text': { "$regex": req.params.search } }, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {

            res.send(col);

        });
    }


};

exports.updateUserPackage = function (req, res, next) {

    var UserPackageData = req.body;
    var query = { _id: UserPackageData._id };
    UserPackage.update(query, UserPackageData, function (err, UserPackage) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate job Seeker Name');
            }
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(UserPackage);
    });
};