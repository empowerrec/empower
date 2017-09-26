var TravelPreference = require('mongoose').model('TravelPreference');

exports.getTravelPreferences = function (req, res) {
    var currentPage = parseInt(req.query.currentPage) > 0 ? parseInt(req.query.currentPage) : 1,
        pageSize = parseInt(req.query.pageSize) > 0 ? parseInt(req.query.pageSize) : 10;
    console.log("Current Page : ", req.query.currentLang);
    if (req.query.currentLang) {
        
        TravelPreference.find({ 'Name.Lang': { "$eq": req.query.currentLang } }, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            res.send(col);
        });
    } else {
        TravelPreference.find(JSON.parse(req.query.query))
            .populate('ModifiedBy').populate('CreatedBy')
            .limit(pageSize).skip(pageSize * (currentPage - 1))
            .exec(function (err, col) {
            TravelPreference.count(JSON.parse(req.query.query)).exec(function (errr, count) {
                res.send([{ collection: col, allDataCount: count }]);
            });
        });
    }
   
};

exports.getTravelPreferenceById = function(req, res) {
    TravelPreference.findOne({_id: req.params.id}).populate('ModifiedBy').exec(function(err, col) {

        res.send(col);
    });
};

exports.createTravelPreference = function (req, res, next) {
    var TravelPreferenceData = req.body;

    TravelPreference.create(TravelPreferenceData, function (err, TravelPreference) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate TravelPreference');
            }
            res.status(400);

            return res.send({reason: err.toString()});
        }
        res.send(TravelPreference);
    });
};

exports.updateTravelPreference = function (req, res, next) {
    
    var TravelPreferenceData = req.body;
    var query = { _id: TravelPreferenceData._id };
    TravelPreference.update(query,TravelPreferenceData, function (err, TravelPreference) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate User Name');
            }
            res.status(400);
            return res.send({reason: err.toString()});
        }
        res.send(TravelPreference);
    });
};