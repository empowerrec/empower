var LanguageLevel = require('mongoose').model('LanguageLevel');

exports.getLanguageLevels = function (req, res) {
    //LanguageLevel.find({}).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
    //    res.send(col);
    //});
    
    if (req.query.currentLang) {
        LanguageLevel.find({ 'Name.Lang': { "$eq": req.query.currentLang } }, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            //console.log(err);
            res.send(col);

        });
    } else {
        LanguageLevel.find({}).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            //console.log(err);
            res.send(col);

        });
    }

    //if (isAdmin(req)) {
    //    LanguageLevel.find({}).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
    //        res.send(col);
    //    });
    //} else if (req.query.jobSeeker) {
        
    //    console.log('req.user' + req.user);
    //    LanguageLevel.find({ JobSeeker: req.query.jobSeeker }).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
    //        res.send(col);
    //    });
    //} else {
        
    //    console.log('req.user' + req.user);
    //    LanguageLevel.find({ CreatedBy: req.user }).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
    //        res.send(col);
    //    });
    //}
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

exports.getLanguageLevelById = function (req, res) {
    LanguageLevel.findOne({ _id: req.params.id }).exec(function (err, col) {
        res.send(col);
    });
};
exports.createLanguageLevel = function (req, res, next) {
    var languageLevelData = req.body;
    
    LanguageLevel.create(languageLevelData, function (err, languageLevel) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate LanguageLevel');
            }
            res.status(400);
            
            return res.send({ reason: err.toString() });
        }
        res.send(languageLevel);
    });
};
//languageLevels
exports.updateLanguageLevel = function (req, res, next) {
    console.log(req.params[0]);
    var languageLevelData = req.body;
    var query = { _id: languageLevelData._id };
    LanguageLevel.update(query, languageLevelData, function (err, languageLevel) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate User Name');
            }
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(languageLevel);
    });
};