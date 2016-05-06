var LanguageSkill = require('mongoose').model('LanguageSkill');

exports.getLanguageSkills = function (req, res) {
    //LanguageSkill.find({}).exec(function (err, col) {
    //    res.send(col);
    //});
    if (isAdmin(req)) {
        LanguageSkill.find({}).populate('LanguageLevel').populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            res.send(col);
        });
    } else if (req.query.jobSeeker) {
        
        console.log('req.user' + req.user);
        LanguageSkill.find({ JobSeeker: req.query.jobSeeker }).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            res.send(col);
        });
    } else {
        
        console.log('req.user' + req.user);
        LanguageSkill.find({ CreatedBy: req.user }).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            res.send(col);
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