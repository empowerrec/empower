var Vacancy = require('mongoose').model('Vacancy');
var Industry = require('mongoose').model('Industry');
//var mvIdentity = require('users');

exports.getVacancies = function (req, res) {
    var currentPage = parseInt(req.query.currentPage) > 0 ? parseInt(req.query.currentPage) : 1,
        pageSize = parseInt(req.query.pageSize) > 0 ? parseInt(req.query.pageSize) : 10;
    console.log(req.query.jobSeeker);
    if (req.query.Industry) {
        Vacancy.find({ $and: [{ Industry: req.query.Industry }, { Deleted: false }] }).populate('ModifiedBy').populate('CreatedBy').populate('Industry')
            .limit(pageSize)
            .skip(pageSize * (currentPage - 1))
            .exec(function (err, col) {
            Vacancy.count({ $and: [{ Industry: req.query.Industry }, { Deleted: false }] }).exec(function (errr, count) {
                res.send([{ collection: col, allDataCount: count }]);
            });
        });
    } else if (req.query.jobSeeker) {
        Vacancy.find(JSON.parse(req.query.query)).populate('ModifiedBy').populate('CreatedBy').populate('Industry')
            .limit(pageSize)
            .skip(pageSize * (currentPage - 1))
            .exec(function (err, col) {
            Vacancy.count(JSON.parse(req.query.query)).exec(function (errr, count) {
                res.send([{ collection: col, allDataCount: count }]);
            });
        });
    } else if (isAdmin(req)) {
        Vacancy.find({ Deleted : false }).populate('Industry').populate('ModifiedBy').populate('CreatedBy')
            .limit(pageSize)
            .skip(pageSize * (currentPage - 1))
            .exec(function (err, col) {
            Vacancy.count({ Deleted : false }).exec(function (errr, count) {
                res.send([{ collection: col, allDataCount: count }]);
            });
        });
    } else {
        Vacancy.find({ CreatedBy: req.user, Deleted : false }).populate('ModifiedBy').populate('CreatedBy').populate('Industry').limit(pageSize)
            .skip(pageSize * (currentPage - 1))
            .exec(function (err, col) {
            Vacancy.count({ CreatedBy: req.user, Deleted : false }).exec(function (errr, count) {
                res.send([{ collection: col, allDataCount: count }]);
            });
        });
    }
};

exports.getVacanciesSearchResult = function (req, res) {
    Vacancy.aggregate([
        {
            $group : {
                _id : '$' + req.query.groupBy,
                ind: { $first: '$' + req.query.groupBy },
                count: { $sum: 1 }
            }
        }
    ]).exec(function (err, col) {
        Industry.populate(col, { path: 'ind' }, function (err, populatedCol) {
            var x = JSON.parse(JSON.stringify(populatedCol));
            res.send(x);
        });
    });
};

exports.getVacancyById = function (req, res) {
    if (req.params.id == 'profile') {
        Vacancy.findOne({ User: req.user }).populate('City').populate('ModifiedBy').exec(function (err, col) {
            res.send(col);
        });
    } else {
        Vacancy.findOne({ _id: req.params.id }).populate('City').populate('ModifiedBy').exec(function (err, col) {
            res.send(col);
        });
    }
};

exports.getVacancyByIdForDetail = function (req, res) {
    if (req.params.id == 'profile') {
        Vacancy.findOne({ User: req.user }).populate('EducationalLevel').populate('JobType')
            .populate('Industry').populate('Country').populate('City').populate('CareerLevel').populate('SalaryCurancy')
            .populate('ModifiedBy').exec(function (err, col) {
            res.send(col);
        });
    } else {
        Vacancy.findOne({ _id: req.params.id })
            .populate('EducationalLevel').populate('JobType')
            .populate('Industry').populate('Country').populate('City').populate('CareerLevel').populate('SalaryCurancy')
            .populate('ModifiedBy').exec(function (err, col) {
            res.send(col);
        });
    }
};

function isAdmin(req) {
    
    for (var role in req.user.UserType) {
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
            
            return res.send({ reason: err.toString() });
        }
        res.send(vacancy);
    });
};

exports.updateVacancy = function (req, res, next) {
    
    var vacancyData = req.body;
    var query = { _id: vacancyData._id };
    Vacancy.update(query, vacancyData, function (err, vacancy) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate Vacancy Name');
            }
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(vacancy);
    });
};