var Package = require('mongoose').model('Package');

exports.getPackages = function (req, res) {
    
    var currentPage = parseInt(req.query.currentPage) > 0 ? parseInt(req.query.currentPage) : 1,
        pageSize = parseInt(req.query.pageSize) > 0 ? parseInt(req.query.pageSize) : 10;
    
    if (req.query.currentLang && req.query.userType) {
        Package.find({ $and: [{ 'Name.Lang': { "$eq": req.query.currentLang } }, { 'Type': { "$eq": req.query.userType } }, { 'Deleted': { "$eq": false } }] }, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').populate('User').exec(function (err, col) {
            res.send(col);
        });
    } else if (req.query.currentLang) {
        Package.find({ 'Name.Lang': { "$eq": req.query.currentLang } }, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            res.send(col);
        });
    } else {
        console.log(req.query.query);
        Package.find(JSON.parse(req.query.query))
            .populate('ModifiedBy').populate('CreatedBy')
            .limit(pageSize).skip(pageSize * (currentPage - 1))
            .exec(function (err, col) {
            Package.count(JSON.parse(req.query.query)).exec(function (errr, count) {
                res.send([{ collection: col, allDataCount: count }]);
            });
        });
    }
    
};

exports.getPackageById = function (req, res) {
    Package.findOne({ _id: req.params.id }).populate('ModifiedBy').exec(function (err, col) {
        res.send(col);
    });
};

exports.createPackage = function (req, res, next) {
    var PackageData = req.body;
    
    Package.create(PackageData, function (err, Package) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate Package');
            }
            res.status(400);
            
            return res.send({ reason: err.toString() });
        }
        res.send(Package);
    });
};

exports.getPackageByName = function (req, res) {

    if (req.query.currentLang && req.query.Confirmed) {
        Package.find({ 'Name.Lang': { "$eq": req.query.currentLang }, 'Name.Text': { "$regex": req.params.search }, 'Confirmed': { "$eq": req.query.Confirmed }  }, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').exec(function(err, col) {

            res.send(col);

        });
    } else if (req.query.currentLang) {
        Package.find({ 'Name.Lang': { "$eq": req.query.currentLang }, 'Name.Text': { "$regex": req.params.search } }, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').exec(function(err, col) {

            res.send(col);

        });
    } else {
        Package.find({ 'Name.Text': { "$regex": req.params.search } }, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').exec(function(err, col) {

            res.send(col);

        });
    }


};

exports.updatePackage = function (req, res, next) {
   
    var PackageData = req.body;
    var query = { _id: PackageData._id };
    Package.update(query, PackageData, function (err, Package) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate job Seeker Name');
            }
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(Package);
    });
};