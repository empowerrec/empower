var Vacancy = require('mongoose').model('Vacancy');
//var mvIdentity = require('users');


exports.getVacancies = function (req, res) {    
    var currentPage = parseInt(req.query.currentPage) > 0 ? parseInt(req.query.currentPage) : 1,
        pageSize = parseInt(req.query.pageSize) > 0 ? parseInt(req.query.pageSize) : 10;
    
    //Vacancy.find(JSON.parse(req.query.query))
    //       .populate('ModifiedBy').populate('CreatedBy')
    //        .limit(pageSize).skip(pageSize * (currentPage - 1))
    //        .exec(function (err, col) {
    //    Vacancy.count(JSON.parse(req.query.query)).exec(function (errr, count) {
    //        res.send([{ collection: col, allDataCount: count }]);
    //    });
    //});
    
     if (req.query.jobSeeker) {
        Vacancy.find(JSON.parse(req.query)).populate('ModifiedBy').populate('CreatedBy')
            .limit(pageSize)
            .skip(pageSize * (currentPage - 1))
            .exec(function (err, col) {
            Vacancy.count(JSON.parse(req.query)).exec(function (errr, count) {
                res.send([{ collection: col, allDataCount: count }]);
            });
        });
    } else if (isAdmin(req)) {
        Vacancy.find({ Deleted : false }).populate('ModifiedBy').populate('CreatedBy')
            .limit(pageSize)
            .skip(pageSize * (currentPage - 1))
            .exec(function (err, col) {
            Vacancy.count({ Deleted : false }).exec(function (errr, count) {
                res.send([{ collection: col, allDataCount: count }]);
            });
        });
    } else {
        Vacancy.find({ CreatedBy: req.user, Deleted : false }).populate('ModifiedBy').populate('CreatedBy').limit(pageSize)
            .skip(pageSize * (currentPage - 1))
            .exec(function (err, col) {
            Vacancy.count({ CreatedBy: req.user, Deleted : false }).exec(function (errr, count) {
                res.send([{ collection: col, allDataCount: count }]);
            });
        });
    }
    
};

exports.getVacancyById = function (req, res) {
    
    if (req.params.id == 'profile') {
        console.log(req.user);
        Vacancy.findOne({ User: req.user }).populate('ModifiedBy').exec(function (err, col) {
            console.log(col);
            res.send(col);
        });
    } else {
        Vacancy.findOne({ _id: req.params.id }).populate('ModifiedBy').exec(function (err, col) {
            console.log(col);
            res.send(col);
        });
    }
    //Vacancy.findOne({_id:req.params.id}).exec(function (err, col) {
    //    res.send(col);
    //});
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
exports.createVacancy = function (req, res, next) {
    var vacancyData = req.body;

    Vacancy.create(vacancyData, function (err, vacancy) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate Vacancy');
            }
            res.status(400);

            return res.send({reason: err.toString()});
        }
        res.send(vacancy);
    });
};

exports.updateVacancy = function (req, res, next) {
    console.log(req.params[0]);
    var vacancyData = req.body;
    var query = { _id: vacancyData._id };
    Vacancy.update(query,vacancyData, function (err, vacancy) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate Vacancy Name');
            }
            res.status(400);
            return res.send({reason: err.toString()});
        }
        res.send(vacancy);
    });
};