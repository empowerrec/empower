var City = require('mongoose').model('City');

exports.getCities = function (req, res) {
    
    var currentPage = parseInt(req.query.currentPage) > 0 ? parseInt(req.query.currentPage) : 1,
        pageSize = parseInt(req.query.pageSize) > 0 ? parseInt(req.query.pageSize) : 10;
    
        City.find(JSON.parse(req.query.query))
            .populate('Country').populate('ModifiedBy').populate('CreatedBy')
            .limit(pageSize).skip(pageSize * (currentPage - 1))
            .exec(function (err, col) {
            City.count(JSON.parse(req.query.query)).exec(function (errr, count) {
                res.send([{ collection: col, allDataCount: count }]);
            });
        });
};

exports.getCityById = function (req, res) {
    City.findOne({_id:req.params.id}).populate('ModifiedBy').exec(function (err, col) {
        res.send(col);
    });
};

exports.createCity = function (req, res, next) {
    var cityData = req.body;
    
    City.create(cityData, function (err, city) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate City');
            }
            res.status(400);
            
            return res.send({ reason: err.toString() });
        }
        res.send(city);
    });
};

exports.getCityByName = function (req, res) {
    
    console.log(req.query.currentLang);
    if (req.query.currentLang) {
        City.find({ 'Name.Lang': { "$eq": req.query.currentLang } , 'Name.Text' : { "$regex": req.params.search } }, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            console.log(req.query.currentLang);
            res.send(col);

        });
    } else {
        City.find({ 'Name.Text' : { "$regex": req.params.search } }, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            console.log(req.query.currentLang);
            res.send(col);

        });
    }
    

};

exports.updateCity = function (req, res, next) {
    console.log(req.params[0]);
    var cityData = req.body;
    var query = { _id: cityData._id };
    City.update(query, cityData, function (err, city) {
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