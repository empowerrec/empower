var EducationalInformation = require('mongoose').model('EducationalInformation');

exports.getEducationalInformations = function (req, res) {
    var currentPage = parseInt(req.query.currentPage) > 0 ? parseInt(req.query.currentPage) : 1,
        pageSize = parseInt(req.query.pageSize) > 0 ? parseInt(req.query.pageSize) : 10;
    
    if (req.query.jobSeeker) {
        EducationalInformation.find(JSON.parse(req.query.query))
            .populate('EducationType').populate('Univirsty')
            .populate('Faculty').populate('Specialization').populate('Grade')
            .populate('ModifiedBy').populate('CreatedBy')
            .limit(pageSize)
            .skip(pageSize * (currentPage - 1))
            .exec(function (err, col) {
            var collection = col;
            EducationalInformation.count(JSON.parse(req.query.query)).exec(function (errr, count) {
                res.send([{ collection: collection, allDataCount: count }]);
            });                
        });
    } else if (isAdmin(req)) {
        EducationalInformation.find({ Deleted: false }).populate('EducationType').populate('Univirsty').populate('Faculty').populate('Specialization').populate('Grade')
            .populate('ModifiedBy').populate('CreatedBy')
            .limit(pageSize)
            .skip(pageSize * (currentPage - 1))
            .exec(function (err, col) {
            var collection = col;
            EducationalInformation.count({ Deleted: false }).exec(function (errr, count) {
                res.send([{ collection: collection, allDataCount: count }]);
            });
        });
    } else {
        EducationalInformation.find({ CreatedBy: req.user, Deleted: false }).populate('EducationType').populate('Univirsty').populate('Faculty').populate('Specialization').populate('Grade')
            .populate('ModifiedBy').populate('CreatedBy')
            .limit(pageSize)
            .skip(pageSize * (currentPage - 1))
            .exec(function (err, col) {
            var collection = col;
            EducationalInformation.count({ CreatedBy: req.user, Deleted: false }).exec(function (errr, count) {
                res.send([{ collection: collection, allDataCount: count }]);
            });
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
        EducationalInformation.findOne({ User: req.user }).populate('Univirsty')
            .populate('Faculty').populate('Specialization').populate('ModifiedBy').exec(function (err, col) {
            res.send(col);
        });
    } else {
        EducationalInformation.findOne({ _id: req.params.id }).populate('Univirsty')
            .populate('Faculty').populate('Specialization').populate('ModifiedBy').exec(function (err, col) {
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