var Skill = require('mongoose').model('Skill');

exports.getSkills = function (req, res) {
    var currentPage = parseInt(req.query.currentPage) > 0 ? parseInt(req.query.currentPage) : 1,
        pageSize = parseInt(req.query.pageSize) > 0 ? parseInt(req.query.pageSize) : 10;
    
    if (req.query.jobSeeker) {
        Skill.find(JSON.parse(req.query.query)).populate('SkillType').populate('SkillLevel').populate('ModifiedBy').populate('CreatedBy')
            .limit(pageSize)
            .skip(pageSize * (currentPage - 1))
            .exec(function (err, col) {
            Skill.count(JSON.parse(req.query.query)).exec(function (errr, count) {
                res.send([{ collection: col, allDataCount: count }]);
            });
        });
    } else if (isAdmin(req)) {
        Skill.find({ Deleted : false }).populate('SkillType').populate('SkillLevel').populate('ModifiedBy').populate('CreatedBy')
            .limit(pageSize)
            .skip(pageSize * (currentPage - 1))
            .exec(function (err, col) {
            Skill.count({ Deleted : false }).exec(function (errr, count) {
                res.send([{ collection: col, allDataCount: count }]);
            });
        });
    } else {
        Skill.find({ CreatedBy: req.user, Deleted : false }).populate('SkillType').populate('SkillLevel').populate('ModifiedBy').populate('CreatedBy').limit(pageSize)
            .skip(pageSize * (currentPage - 1))
            .exec(function (err, col) {
            Skill.count({ CreatedBy: req.user, Deleted : false }).exec(function (errr, count) {
                res.send([{ collection: col, allDataCount: count }]);
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
}

exports.getSkillById = function (req, res) {
    if (req.params.id == 'profile') {
       
        Skill.findOne({ User: req.user }).populate('ModifiedBy').exec(function (err, col) {
           
            res.send(col);
        });
    } else {
        Skill.findOne({ _id: req.params.id }).populate('ModifiedBy').exec(function (err, col) {
            
            res.send(col);
        });
    }
    
};

exports.createSkill = function (req, res, next) {
    var skillData = req.body;
    
    Skill.create(skillData, function (err, skill) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate Skill');
            }
            res.status(400);
            
            return res.send({ reason: err.toString() });
        }
        res.send(skill);
    });
};

exports.updateSkill = function (req, res, next) {
    
    var skillData = req.body;
    var query = { _id: skillData._id };
    Skill.update(query, skillData, function (err, skill) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate User Name');
            }
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(skill);
    });
};