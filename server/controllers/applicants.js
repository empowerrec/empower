var Applicant = require('mongoose').model('Applicant');
const ObjectId = require('mongoose').Types.ObjectId;
const ISODate = require('mongoose').Types.ISODate;


exports.getApplicants = function (req, res) {
    var currentPage = parseInt(req.query.currentPage) > 0 ? parseInt(req.query.currentPage) : 1,
        pageSize = parseInt(req.query.pageSize) > 0 ? parseInt(req.query.pageSize) : 10;

    if (req.query.currentLang) {
        Applicant.find({ 'Name.Lang': { "$eq": req.query.currentLang } }, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            res.send(col);
        });
    } else {
        //Applicant.find({ 'Name.Lang': { "$eq": "en" } }, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
        //    res.send(col);
        //});
        Applicant.find(JSON.parse(req.query.query))
            .populate({ path: 'Vacancy', populate: { path: 'Employer', model: 'Employer', select: 'EmployerName' } })
            .populate({ path: 'JobSeeker' })
            .populate('ModifiedBy').populate('CreatedBy')
            .limit(pageSize).skip(pageSize * (currentPage - 1))
            .exec(function (err, col) {
                Applicant.count(JSON.parse(req.query.query)).exec(function (errr, count) {
                    res.send([{ collection: col, allDataCount: count }]);
                });
            });
    }

};

exports.getApplicantsSearchResult = function (req, res) {
    var groupBy = req.query.groupBy;

    Applicant.aggregate([
        { $match: { "Vacancy": { "$eq": ObjectId(req.query.vacancyId) } } },
        {
            $lookup:
            {
                from: "jobseekers",
                localField: "JobSeeker",
                foreignField: "_id",
                as: "JobSeeker_Docs"
            }
        },
        {
            $group: {
                _id: '$JobSeeker_Docs.BirthDate',
                groupByObject: { $first: '$JobSeeker_Docs.BirthDate' },
                count: { $sum: 1 }
            }
        }
    ]).exec(function (err, col) {

        if (groupBy == 'BirthDate') {
            res.send(col);
        }



    });
};

exports.getVacancyForApplicant = function (req, res) {
    console.log("JobSeeker : " + req.params.jobSeeker);
    console.log("vacancy : " + req.params.vacancy);
    Applicant.findOne({ JobSeeker: req.params.jobSeeker, Vacancy: req.params.vacancy }).exec(function (err, col) {
        console.log(col);
        res.send(col);
    });

};
exports.getApplicantById = function (req, res) {
    Applicant.findOne({ _id: req.params.id }).populate('JobSeeker').populate('Vacancy')
        .populate('ModifiedBy').exec(function (err, col) {
            res.send(col);
        });
};
exports.getApplicantByName = function (req, res) {


    if (req.query.currentLang) {
        Applicant.find({ 'Name.Lang': { "$eq": req.query.currentLang }, 'Name.Text': { "$regex": req.params.search } }, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {

            res.send(col);

        });
    } else {
        Applicant.find({ 'Name.Text': { "$regex": req.params.search } }, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {

            res.send(col);

        });
    }


};

exports.arrangeInterview = function (req, res, next) {
    var applicantData = req.body;

    Applicant.create(applicantData, function (err, applicant) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate Applicant');
            }
            res.status(400);

            return res.send({ reason: err.toString() });
        }
        res.send(applicant);
    });
};


exports.createApplicant = function (req, res, next) {
    var applicantData = req.body;

    Applicant.create(applicantData, function (err, applicant) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate Applicant');
            }
            res.status(400);

            return res.send({ reason: err.toString() });
        }
        res.send(applicant);
    });
};

exports.updateApplicant = function (req, res, next) {

    var applicantData = req.body;
    var query = { _id: applicantData._id };
    Applicant.update(query, applicantData, function (err, applicant) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate job Seeker Name');
            }
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(applicant);
    });
};

exports.getApplicantsCount = function (req, res) {

    Applicant.aggregate([
        {
            "$match": {
                "Vacancy": { "$eq": require('mongoose').Types.ObjectId(req.query.Vacancy) }
            }
        },{
            "$group": {
                "_id": "$Vacancy",
                "vacancyCount": { "$sum": 1 },
                "I": {
                    "$sum": {
                        "$cond": [{ "$eq": ["$Status", "I"] }, 1, 0]
                    }
                },
                "N": {
                    "$sum": {
                        "$cond": [{ "$eq": ["$Status", "N"] }, 1, 0]
                    }
                },
                "A": {
                    "$sum": {
                        "$cond": [{ "$eq": ["$Status", "A"] }, 1, 0]
                    }
                },
                "O": {
                    "$sum": {
                        "$cond": [{ "$eq": ["$Status", "O"] }, 1, 0]
                    }
                },
                "S": {
                    "$sum": {
                        "$cond": [{ "$eq": ["$Status", "S"] }, 1, 0]
                    }
                }
            }
        },
        {
            "$project": {
                "_id": 0,
                "vacancy": "$_id",
                "vacancyCount": 1,
                "I": 1,
                "N": 1,
                "A": 1,
                "O": 1,
                "S": 1
            }
        }
    ]).exec(function (err, col) {
        return res.send(col);
    });
};