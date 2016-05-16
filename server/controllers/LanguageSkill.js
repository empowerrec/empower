var LanguageSkill = require('mongoose').model('LanguageSkill');

//exports.getLanguageSkills = function (req, res) {
//    //LanguageSkill.find({}).exec(function (err, col) {
//    //    res.send(col);
//    //});
//    if (isAdmin(req)) {
//        LanguageSkill.find({}).populate('Language').populate('LanguageSkillLevel').populate('ModifiedBy').populate('CreatedBy')
//            .exec(function (err, col) {
//            res.send(col);
//        });
//    } else if (req.query.jobSeeker) {
        
//        console.log('req.user' + req.user);
//        LanguageSkill.find({ JobSeeker: req.query.jobSeeker, Deleted : false }).populate('Language').populate('LanguageSkillLevel').populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
//            res.send(col);
//        });
//    } else {
        
//        console.log('req.user' + req.user);
//        LanguageSkill.find({ CreatedBy: req.user }).populate('Language').populate('LanguageSkillLevel').populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
//            res.send(col);
//        });
//    }
//};

exports.getLanguageSkills = function (req, res) {
    var currentPage = parseInt(req.query.currentPage) > 0 ? parseInt(req.query.currentPage) : 1,
        pageSize = parseInt(req.query.pageSize) > 0 ? parseInt(req.query.pageSize) : 10;
    
    if (req.query.jobSeeker) {
        LanguageSkill.find(JSON.parse(req.query.query)).populate('Language').populate('LanguageSkillLevel').populate('ModifiedBy').populate('CreatedBy')
            .limit(pageSize)
            .skip(pageSize * (currentPage - 1))
            .exec(function (err, col) {
            LanguageSkill.count(JSON.parse(req.query.query)).exec(function (errr, count) {
                res.send([{ collection: col, allDataCount: count }]);
            });
        });
    } else if (isAdmin(req)) {
        LanguageSkill.find({ Deleted : false }).populate('Language').populate('LanguageSkillLevel').populate('ModifiedBy').populate('CreatedBy')
            .limit(pageSize)
            .skip(pageSize * (currentPage - 1))
            .exec(function (err, col) {
            LanguageSkill.count({ Deleted : false }).exec(function (errr, count) {
                res.send([{ collection: col, allDataCount: count }]);
            });
        });
    } else {
        LanguageSkill.find({ CreatedBy: req.user, Deleted : false }).populate('Language').populate('LanguageSkillLevel').populate('ModifiedBy').populate('CreatedBy').limit(pageSize)
            .skip(pageSize * (currentPage - 1))
            .exec(function (err, col) {
            LanguageSkill.count({ CreatedBy: req.user, Deleted : false }).exec(function (errr, count) {
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

exports.getLanguageSkillById = function (req, res) {
    LanguageSkill.findOne({_id:req.params.id}).exec(function (err, col) {
        res.send(col);
    });
};
exports.createLanguageSkill = function (req, res, next) {
    var languageSkillData = req.body;
    
    LanguageSkill.create(languageSkillData, function (err, languageSkill) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate LanguageSkill');
            }
            res.status(400);
            
            return res.send({ reason: err.toString() });
        }
        res.send(languageSkill);
    });
};

exports.updateLanguageSkill = function (req, res, next) {
    console.log(req.params[0]);
    var languageSkillData = req.body;
    var query = { _id: languageSkillData._id };
    LanguageSkill.update(query, languageSkillData, function (err, languageSkill) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate User Name');
            }
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(languageSkill);
    });
};