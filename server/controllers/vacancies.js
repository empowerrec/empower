var Vacancy = require('mongoose').model('Vacancy');
var Industry = require('mongoose').model('Industry');
var Country = require('mongoose').model('Country');
var City = require('mongoose').model('City');
var Area = require('mongoose').model('Area');
var JobRole = require('mongoose').model('JobRole');
var JobType = require('mongoose').model('JobType');
var EducationalLevel = require('mongoose').model('EducationalLevel');
var CareerLevel = require('mongoose').model('CareerLevel');

exports.getVacancies = function (req, res) {
    var currentPage = parseInt(req.query.currentPage) > 0 ? parseInt(req.query.currentPage) : 1,
        pageSize = parseInt(req.query.pageSize) > 0 ? parseInt(req.query.pageSize) : 10;
    console.log(req.query.jobSeeker);
    if (req.query.Industry) {
        Vacancy.find({ $and: [{ Industry: req.query.Industry }, { Deleted: false }] })
            .populate('ModifiedBy').populate('CreatedBy')
            .populate('Industry').populate('Country')
            .limit(pageSize)
            .skip(pageSize * (currentPage - 1))
            .exec(function (err, col) {
            Vacancy.count({ $and: [{ Industry: req.query.Industry }, { Deleted: false }] }).exec(function (errr, count) {
                res.send([{ collection: col, allDataCount: count }]);
            });
        });
    } else if (req.query.jobSeeker) {
        Vacancy.find(JSON.parse(req.query.query)).populate('ModifiedBy')
            .populate('CreatedBy').populate('Industry').populate('Country')
            .limit(pageSize)
            .skip(pageSize * (currentPage - 1))
            .exec(function (err, col) {
            Vacancy.count(JSON.parse(req.query.query)).exec(function (errr, count) {
                res.send([{ collection: col, allDataCount: count }]);
            });
        });
    } else if (isAdmin(req)) {
        var xx = JSON.parse(req.query.query);
        console.log(xx);
        Vacancy.find(JSON.parse(req.query.query)).populate('Industry')
            .populate('ModifiedBy').populate('CreatedBy').populate('Country')
            .limit(pageSize)
            .skip(pageSize * (currentPage - 1))
            .exec(function (err, col) {
            Vacancy.count(JSON.parse(req.query.query)).exec(function (errr, count) {
                res.send([{ collection: col, allDataCount: count }]);
            });
        });
    } else {
        Vacancy.find({ CreatedBy: req.user, Deleted: false }).populate('ModifiedBy')
            .populate('CreatedBy').populate('Industry').populate('Country').limit(pageSize)
            .skip(pageSize * (currentPage - 1))
            .exec(function (err, col) {
            Vacancy.count({ CreatedBy: req.user, Deleted : false }).exec(function (errr, count) {
                res.send([{ collection: col, allDataCount: count }]);
            });
        });
    }
};

exports.getVacanciesSearchResult = function (req, res) {
    var groupBy = req.query.groupBy;
    
    Vacancy.aggregate([{
            $group : {
                _id : '$' + groupBy,
                groupByObject: { $first: '$' + groupBy },
                count: { $sum: 1 }
            }
        }]).exec(function (err, col) {
        
        if (groupBy == 'Industry') {
            Industry.populate(col, { path: 'groupByObject', select: 'Name' }, function (err, populatedCol) {
                var x = JSON.parse(JSON.stringify(populatedCol));
                res.send(x);
            });
        } else if (groupBy == 'Country') {
            Country.populate(col, { path: 'groupByObject', select: 'Name' }, function (err, populatedCol) {
                var x = JSON.parse(JSON.stringify(populatedCol));
                res.send(x);
            });
        } else if (groupBy == 'City') {
            City.populate(col, { path: 'groupByObject', select: 'Name' }, function (err, populatedCol) {
                var x = JSON.parse(JSON.stringify(populatedCol));
                res.send(x);
            });
        } else if (groupBy == 'Area') {
            Area.populate(col, { path: 'groupByObject', select: 'Name' }, function (err, populatedCol) {
                var x = JSON.parse(JSON.stringify(populatedCol));
                res.send(x);
            });
        } else if (groupBy == 'JobRole') {
            JobRole.populate(col, { path: 'groupByObject', select: 'Name' }, function (err, populatedCol) {
                var x = JSON.parse(JSON.stringify(populatedCol));
                res.send(x);
            });
        } else if (groupBy == 'JobType') {
            JobType.populate(col, { path: 'groupByObject', select: 'Name' }, function (err, populatedCol) {
                var x = JSON.parse(JSON.stringify(populatedCol));
                res.send(x);
            });
        } else if (groupBy == 'EducationalLevel') {
            EducationalLevel.populate(col, { path: 'groupByObject', select: 'Name' }, function (err, populatedCol) {
                var x = JSON.parse(JSON.stringify(populatedCol));
                res.send(x);
            });
        } else if (groupBy == 'CareerLevel') {
            CareerLevel.populate(col, { path: 'groupByObject', select: 'Name' }, function (err, populatedCol) {
                var x = JSON.parse(JSON.stringify(populatedCol));
                res.send(x);
            });
        }

    });
};

exports.getVacancyById = function (req, res) {
    if (req.params.id == 'profile') {
        Vacancy.findOne({ User: req.user }).populate('EducationalLevel')
            .populate('JobType').populate('Industry').populate('Country')
            .populate('City').populate('CareerLevel').populate('SalaryCurancy')
            .populate('Area').exec(function (err, col) {
            res.send(col);
        });
    } else {
        Vacancy.findOne({ _id: req.params.id })
            .populate('EducationalLevel').populate('JobType')
            .populate('Industry').populate('Country')
            .populate('City').populate('CareerLevel')
            .populate('SalaryCurancy')
            .populate('Area').exec(function (err, col) {
            res.send(col);
        });
    }
};

exports.getVacancyByIdForDetail = function (req, res) {
    if (req.params.id == 'profile') {
        Vacancy.findOne({ User: req.user }).populate('EducationalLevel').populate('JobType')
            .populate('Industry').populate('Country')
            .populate('City').populate('CareerLevel')
            .populate('SalaryCurancy').populate('Area')
            .populate('ModifiedBy').exec(function (err, col) {
            res.send(col);
        });
    } else {
        Vacancy.findOne({ _id: req.params.id })
            .populate('EducationalLevel').populate('JobType')
            .populate('Industry').populate('Country').populate('City')
            .populate('CareerLevel').populate('SalaryCurancy').populate('Area')
            .populate('ModifiedBy').exec(function (err, col) {
            res.send(col);
        });
    }
};

exports.getVacancyByIdForUpdate = function (req, res) {
    if (req.params.id == 'profile') {
        Vacancy.findOne({ User: req.user }).exec(function (err, col) {
                res.send(col);
            });
    } else {
        Vacancy.findOne({ _id: req.params.id }).populate({
            path: 'LanguageSkills.LanguageLevel',
            model: 'LanguageLevel'
        }).populate({
            path: 'LanguageSkills.Language',
            model: 'Language'
            }).populate({
                path: 'Industry',
                model: 'Industry'
            }).populate({
                path: 'JobRole',
                model: 'JobRole'
            }).populate('City').populate('Area').populate('Questions')
            .exec(function (err, col) {

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

exports.updateVacanciesCity = function (req, res) {
    console.log("Update City In vacancies");
    var ids = req.params.id.split("_");
    var newCityId = ids[0];
    var oldCityId = ids[1];//city for change to newCityId
    Vacancy.find({ City: oldCityId }).exec(function (err, col) {
        col.forEach(function (entry) {
            var query = { _id: entry._id };
            entry.City = newCityId;
            Vacancy.update(query, entry, function (err, vacancy) {
                if (err) {
                    if (err.toString().indexOf('E11000') > -1) {
                        err = new Error('Duplicate Vacancy');
                    }
                    res.status(400);
                    return res.send({ reason: err.toString() });
                }
                
            });

        });
        res.send(col);
    });


};

exports.updateVacanciesArea = function (req, res) {
    console.log("Update Area In vacancies");
    var ids = req.params.id.split("_");
    var newAreaId = ids[0];
    var oldAreaId = ids[1];//Area for change to newAreaId
    Vacancy.find({ Area: oldAreaId }).exec(function (err, col) {
        col.forEach(function (entry) {
            var query = { _id: entry._id };
            entry.Area = newAreaId;
            Vacancy.update(query, entry, function (err, vacancy) {
                if (err) {
                    if (err.toString().indexOf('E11000') > -1) {
                        err = new Error('Duplicate Vacancy');
                    }
                    res.status(400);
                    return res.send({ reason: err.toString() });
                }
                
            });

        });
        res.send(col);
    });


};
