var Language = require('mongoose').model('Language');

exports.getLanguages = function (req, res) {
    Language.find({}).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
        res.send(col);
    });
};

exports.getLanguageById = function (req, res) {
    Language.findOne({_id:req.params.id}).populate('ModifiedBy').exec(function (err, col) {
        res.send(col);
    });
};

exports.createLanguage = function (req, res, next) {
    var languageData = req.body;
    
    Language.create(languageData, function (err, language) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate Language');
            }
            res.status(400);
            
            return res.send({ reason: err.toString() });
        }
        res.send(language);
    });
};

exports.updateLanguage = function (req, res, next) {
    
    var languageData = req.body;
    var query = { _id: languageData._id };
    Language.update(query, languageData, function (err, language) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate job Seeker Name');
            }
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(language);
    });
};