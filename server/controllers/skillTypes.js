var SkillType = require('mongoose').model('SkillType');

exports.getSkillTypes = function (req, res) {
    SkillType.find({}).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
        res.send(col);
    });
};

exports.getSkillTypeById = function (req, res) {
    SkillType.findOne({_id:req.params.id}).populate('ModifiedBy').exec(function (err, col) {
        res.send(col);
    });
};

exports.createSkillType = function (req, res, next) {
    var cityData = req.body;
    
    SkillType.create(cityData, function (err, city) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate SkillType');
            }
            res.status(400);
            
            return res.send({ reason: err.toString() });
        }
        res.send(city);
    });
};

exports.getSkillTypeByName = function (req, res) {
    
    
    if (req.query.currentLang) {
        SkillType.find({ 'Name.Lang': { "$eq": req.query.currentLang } , 'Name.Text' : { "$regex": req.params.search } }, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            
            res.send(col);

        });
    } else {
        SkillType.find({ 'Name.Text' : { "$regex": req.params.search } }, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            
            res.send(col);

        });
    }
    

};

exports.updateSkillType = function (req, res, next) {
    
    var cityData = req.body;
    var query = { _id: cityData._id };
    SkillType.update(query, cityData, function (err, city) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate job Seeker Name');
            }
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(city);
    });
};