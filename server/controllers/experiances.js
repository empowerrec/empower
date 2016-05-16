var Experiance = require('mongoose').model('Experiance');

exports.getExperiances = function (req, res) {
    var currentPage = parseInt(req.query.currentPage) > 0 ? parseInt(req.query.currentPage) : 1,
        pageSize = parseInt(req.query.pageSize) > 0 ? parseInt(req.query.pageSize) : 10;
    
    if (req.query.jobSeeker) {
        Experiance.find(JSON.parse(req.query)).populate('ModifiedBy').populate('CreatedBy')
            .limit(pageSize)
            .skip(pageSize * (currentPage - 1))
            .exec(function (err, col) {
            Experiance.count(JSON.parse(req.query)).exec(function (errr, count) {
                res.send([{ collection: col, allDataCount: count }]);
            });
        });
    } else if (isAdmin(req)) {
        Experiance.find({ Deleted : false }).populate('ModifiedBy').populate('CreatedBy')
            .limit(pageSize)
            .skip(pageSize * (currentPage - 1))
            .exec(function (err, col) {
            Experiance.count({ Deleted : false }).exec(function (errr, count) {
                res.send([{ collection: col, allDataCount: count }]);
            });
        });
    } else {
        Experiance.find({ CreatedBy: req.user, Deleted : false }).populate('ModifiedBy').populate('CreatedBy').limit(pageSize)
            .skip(pageSize * (currentPage - 1))
            .exec(function (err, col) {
            Experiance.count({ CreatedBy: req.user, Deleted : false }).exec(function (errr, count) {
                res.send([{ collection: col, allDataCount: count }]);
            });
        });
    }
    
    
};
function isAdmin(req) {
    console.log('UserDetai2' + req.user.UserType);
    
    for (var role in req.user.UserType) {
        console.log('UserDetai3' + req.user.UserType[role]);
        if (req.user.UserType[role] == 'A') {
            return true;
        }
    }
}

exports.getExperianceById = function (req, res) {
    if (req.params.id == 'profile') {
        console.log(req.user);
        Experiance.findOne({ User: req.user }).populate('ModifiedBy').exec(function (err, col) {
            console.log(col);
            res.send(col);
        });
    } else {
        Experiance.findOne({ _id: req.params.id }).populate('ModifiedBy').exec(function (err, col) {
            console.log(col);
            res.send(col);
        });
    }
    
};

exports.createExperiance = function (req, res, next) {
    var experianceData = req.body;
    
    Experiance.create(experianceData, function (err, experiance) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate Experiance');
            }
            res.status(400);
            
            return res.send({ reason: err.toString() });
        }
        res.send(experiance);
    });
};

exports.updateExperiance = function (req, res, next) {
    console.log(req.params[0]);
    var experianceData = req.body;
    var query = { _id: experianceData._id };
    Experiance.update(query, experianceData, function (err, experiance) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate User Name');
            }
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(experiance);
    });
};