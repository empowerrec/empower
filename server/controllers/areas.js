var Area = require('mongoose').model('Area');

exports.getAreas = function (req, res) {
    Area.find({}).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
        res.send(col);
    });
};

exports.getAreaById = function (req, res) {
    Area.findOne({ _id: req.params.id }).populate('ModifiedBy').exec(function (err, col) {
        res.send(col);
    });
};
exports.getAreaByName = function (req, res) {
    
    console.log(req.query.currentLang);
    if (req.query.currentLang) {
        Area.find({ 'Name.Lang': { "$eq": req.query.currentLang } , 'Name.Text' : { "$regex": req.params.search } }, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            console.log(req.query.currentLang);
            res.send(col);

        });
    } else {
        Area.find({ 'Name.Text' : { "$regex": req.params.search } }, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            console.log(req.query.currentLang);
            res.send(col);

        });
    }
    

};
exports.createArea = function (req, res, next) {
    var areaData = req.body;
    
    Area.create(areaData, function (err, area) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate Area');
            }
            res.status(400);
            
            return res.send({ reason: err.toString() });
        }
        res.send(area);
    });
};

exports.updateArea = function (req, res, next) {
    console.log(req.params[0]);
    var areaData = req.body;
    var query = { _id: areaData._id };
    Area.update(query, areaData, function (err, area) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate job Seeker Name');
            }
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(area);
    });
};