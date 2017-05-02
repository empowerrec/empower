var JobSeeker = require('mongoose').model('JobSeeker');

exports.getJobSeekers = function (req, res) {
    var currentPage = parseInt(req.query.currentPage) > 0 ? parseInt(req.query.currentPage) : 1,
        pageSize = parseInt(req.query.pageSize) > 0 ? parseInt(req.query.pageSize) : 10;
    
    JobSeeker.find(JSON.parse(req.query.query))
            .populate('Gender').populate('ModifiedBy').populate('CreatedBy')
            .limit(pageSize).skip(pageSize * (currentPage - 1))
            .exec(function (err, col) {
        JobSeeker.count(JSON.parse(req.query.query)).exec(function (errr, count) {
            res.send([{ collection: col, allDataCount: count }]);
        });
    });
};

exports.getJobSeekerById = function (req, res) {
    
    if (req.params.id == 'profile') {
        
        JobSeeker.findOne({ User: req.user })
            .populate('ModifiedBy')
            .populate({
                path: 'Address.Country',
                model: 'Country'
            })
            .populate({
                path: 'Address.City',
                model: 'City'
            })
            .populate({
                path: 'Address.Area',
                model: 'Area'
            })
            .populate({
                path: 'Courses.TrainingCenter',
                model: 'TrainingCenter'
            })
            .populate({
                path: 'Courses.Specialization',
                model: 'Specialization'
            })
            .populate({
                path: 'Courses.Grade',
                model: 'Grade'
            }).populate({
                path: 'EducationalInformation.EducationType',
                model: 'EducationType'
            })
            .populate({
                path: 'EducationalInformation.Univirsty',
                model: 'Univirsty'
            })
            .populate({
                path: 'EducationalInformation.Faculty',
                model: 'Faculty'
            }).populate({
                path: 'EducationalInformation.Grade',
                model: 'Grade'
            })
            .populate({
                path: 'Skills.SkillType',
                model: 'SkillType'
            })
            .populate({
                path: 'Skills.SkillLevel',
                model: 'SkillLevel'
            }).populate({
                path: 'LanguageSkills.Language',
                model: 'Language'
            }).populate({
                path: 'LanguageSkills.LanguageSkillLevel',
                model: 'LanguageLevel'
            })
            .populate({
                path: 'EducationalInformation.Specialization',
                model: 'Specialization'
            })
            .exec(function (err, col) {
            
            res.send(col);
        });
    } else {
        JobSeeker.findOne({ _id: req.params.id })
            .populate('ModifiedBy')
            .populate({
                path: 'Address.Country',
                model: 'Country'
            })
            .populate({
                path: 'Address.City',
                model: 'City'
            })
            .populate({
                path: 'Address.Area',
                model: 'Area'
            })
            .populate({
                path: 'Courses.TrainingCenter',
                model: 'TrainingCenter'
            })
            .populate({
                path: 'Courses.Specialization',
                model: 'Specialization'
            })
            .populate({
                path: 'Courses.Grade',
                model: 'Grade'
            }).populate({
                path: 'EducationalInformation.EducationType',
                model: 'EducationType'
            })
            .populate({
                path: 'EducationalInformation.Univirsty',
                model: 'Univirsty'
            })
            .populate({
                path: 'EducationalInformation.Faculty',
                model: 'Faculty'
            }).populate({
                path: 'EducationalInformation.Grade',
                model: 'Grade'
            })
            .populate({
                path: 'Skills.SkillType',
                model: 'SkillType'
            })
            .populate({
                path: 'Skills.SkillLevel',
                model: 'SkillLevel'
            }).populate({
                path: 'LanguageSkills.Language',
                model: 'Language'
            }).populate({
                path: 'LanguageSkills.LanguageSkillLevel',
                model: 'LanguageLevel'
            })
            .populate({
                path: 'EducationalInformation.Specialization',
                model: 'Specialization'
            }).exec(function (err, col) {
            res.send(col);
        });
    }
    
    
};


exports.getJobSeekerByUser = function (req, res) {
    console.log(req.user._id);
    JobSeeker.findOne({ User: req.user._id }).populate('ModifiedBy').exec(function (err, col) {
        
        res.send(col);
    });
};

exports.getJobSeekerByMobileNumber = function (req, res) {
    JobSeeker.findOne({ CreatedBy: req.user, MobileNo: { $nin: [""] } }).populate('ModifiedBy').exec(function (err, col) {
        res.send(col);
    });
};
exports.createJobSeeker = function (req, res, next) {
    var jobSeekerData = req.body;
    
    JobSeeker.create(jobSeekerData, function (err, jobSeeker) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate JobSeeker');
            }
            res.status(400);
            
            return res.send({ reason: err.toString() });
        }
        res.send(jobSeeker);
    });
};

exports.updateJobSeeker = function (req, res, next) {
    
    var jobSeekerData = req.body;
    var query = { _id: jobSeekerData._id };
    JobSeeker.update(query, jobSeekerData, function (err, jobSeeker) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate job Seeker Name');
            }
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(jobSeeker);
    });
};
exports.updateJobSeekersUnivirsty = function (req, res) {
    console.log("Update Univirsty In JobSeekers");
    var ids = req.params.id.split("_");
    var newUnivirstyId = ids[0];
    var oldUnivirstyId = ids[1];//Univirsty for change to newUnivirstyId
    JobSeeker.find({ Univirsty: oldUnivirstyId }).exec(function (err, col) {
        col.forEach(function (entry) {
            var query = { _id: entry._id };
            entry.Univirsty = newUnivirstyId;
            JobSeeker.update(query, entry, function (err, jobSeeker) {
                if (err) {
                    if (err.toString().indexOf('E11000') > -1) {
                        err = new Error('Duplicate JobSeeker');
                    }
                    res.status(400);
                    return res.send({ reason: err.toString() });
                }
                
            });

        });
        res.send(col);
    });


};