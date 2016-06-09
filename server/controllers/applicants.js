var Applicant = require('mongoose').model('Applicant');

exports.getApplicants = function (req, res) {
    var currentPage = parseInt(req.query.currentPage) > 0 ? parseInt(req.query.currentPage) : 1,
        pageSize = parseInt(req.query.pageSize) > 0 ? parseInt(req.query.pageSize) : 10;
    
    if (req.query.currentLang) {
        Applicant.find({ 'Name.Lang': { "$eq": req.query.currentLang } }, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            res.send(col);
        });
    } else {
        Applicant.find(JSON.parse(req.query.query))
            .populate({ path: 'Vacancy', populate: { path: 'Employer', model: 'Employer', select : 'EmployerName' } })
            .populate('Vacancy').populate('JobSeeker')
            .populate('ModifiedBy').populate('CreatedBy')
            .limit(pageSize).skip(pageSize * (currentPage - 1))
            .exec(function (err, col) {
            Applicant.count(JSON.parse(req.query.query)).exec(function (errr, count) {
                res.send([{ collection: col, allDataCount: count }]);
            });
        });
    }
    
};

exports.getVacancyForApplicant = function (req, res) {
    console.log("JobSeeker : " + req.params.jobSeeker);
    console.log("vacancy : " + req.params.vacancy);
    Applicant.findOne({ JobSeeker: req.params.jobSeeker , Vacancy : req.params.vacancy }).exec(function (err, col) {
        console.log(col);
        res.send(col);
    });
    
};
exports.getApplicantById = function (req, res) {
    Applicant.findOne({ _id: req.params.id }).populate('ModifiedBy').exec(function (err, col) {
        res.send(col);
    });
};
exports.getApplicantByName = function (req, res) {
    
   
    if (req.query.currentLang) {
        Applicant.find({ 'Name.Lang': { "$eq": req.query.currentLang } , 'Name.Text' : { "$regex": req.params.search } }, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            
            res.send(col);

        });
    } else {
        Applicant.find({ 'Name.Text' : { "$regex": req.params.search } }, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            
            res.send(col);

        });
    }
    

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