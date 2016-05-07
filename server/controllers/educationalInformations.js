var EducationalInformation = require('mongoose').model('EducationalInformation');

exports.getEducationalInformations = function (req, res) {
    
    if (req.query.jobSeeker) {
        console.log("Job Seeker");
        EducationalInformation.find({ JobSeeker: req.query.jobSeeker , Deleted:false }).populate('EducationType').populate('Univirsty').populate('Faculty').populate('Specialization').populate('Grade')
            .populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            res.send(col);
        });
    } else if (isAdmin(req)) {
        console.log("Admin");
        EducationalInformation.find({ Deleted:false}).populate('EducationType').populate('Univirsty').populate('Faculty').populate('Specialization').populate('Grade')
            .populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            res.send(col);
        });
    } else {
        console.log("Other");
        EducationalInformation.find({ CreatedBy: req.user, Deleted: false }).populate('EducationType').populate('Univirsty').populate('Faculty').populate('Specialization').populate('Grade')
            .populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
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
    return false;
}

exports.getEducationalInformationById = function (req, res) {
    if (req.params.id == 'profile') {
        EducationalInformation.findOne({ User: req.user }).populate('ModifiedBy').exec(function (err, col) {
            res.send(col);
        });
    } else {
        EducationalInformation.findOne({ _id: req.params.id }).populate('ModifiedBy').exec(function (err, col) {
            res.send(col);
        });
    }
};

exports.createEducationalInformation = function (req, res) {
    var educationalInformationData = req.body;
    
    EducationalInformation.create(educationalInformationData, function (err, educationalInformation) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate EducationalInformation');
            }
            res.status(400);
            
            return res.send({ reason: err.toString() });
        }
        res.send(educationalInformation);
    });
};

exports.updateEducationalInformation = function (req, res) {
    var educationalInformationData = req.body;
    var query = { _id: educationalInformationData._id };
    EducationalInformation.update(query, educationalInformationData, function (err, educationalInformation) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate User Name');
            }
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(educationalInformation);
    });
};