var SkillLevel = require('mongoose').model('SkillLevel');

exports.getSkillLevels = function (req, res) {
    SkillLevel.find({}).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
        res.send(col);
    });
};

exports.getSkillLevelById = function (req, res) {
    SkillLevel.findOne({_id:req.params.id}).populate('ModifiedBy').exec(function (err, col) {
        res.send(col);
    });
};

exports.createSkillLevel = function (req, res, next) {
    var cityData = req.body;
    
    SkillLevel.create(cityData, function (err, city) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate SkillLevel');
            }
            res.status(400);
            
            return res.send({ reason: err.toString() });
        }
        res.send(city);
    });
};

exports.getSkillLevelByName = function (req, res) {
    
   
    if (req.query.currentLang) {
        SkillLevel.find({ 'Name.Lang': { "$eq": req.query.currentLang } , 'Name.Text' : { "$regex": req.params.search } }, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            
            res.send(col);

        });
    } else {
        SkillLevel.find({ 'Name.Text' : { "$regex": req.params.search } }, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
           
            res.send(col);

        });
    }
    

};

exports.updateSkillLevel = function (req, res, next) {
   
    var cityData = req.body;
    var query = { _id: cityData._id };
    SkillLevel.update(query, cityData, function (err, city) {
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