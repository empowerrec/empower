var Univirsty = require('mongoose').model('Univirsty');

exports.getUnivirsties = function (req, res) {    
    var currentPage = parseInt(req.query.currentPage) > 0 ? parseInt(req.query.currentPage) : 1,
        pageSize = parseInt(req.query.pageSize) > 0 ? parseInt(req.query.pageSize) : 10;
    
    if (req.query.currentLang) {
        Univirsty.find({ 'Name.Lang': { "$eq": req.query.currentLang } }, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            res.send(col);
        });
    } else {
        Univirsty.find(JSON.parse(req.query.query))
            .populate('ModifiedBy').populate('CreatedBy')
            .limit(pageSize).skip(pageSize * (currentPage - 1))
            .exec(function (err, col) {
            Univirsty.count(JSON.parse(req.query.query)).exec(function (errr, count) {
                res.send([{ collection: col, allDataCount: count }]);
            });
        });
    }
   
};

exports.getUnivirstyByName = function (req, res) {
    
    console.log(req.query.currentLang);
    if (req.query.currentLang) {
        Univirsty.find({ 'Name.Lang': { "$eq": req.query.currentLang } , 'Name.Text' : { "$regex": req.params.search } }, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            console.log(req.query.currentLang);
            res.send(col);

        });
    } else {
        Univirsty.find({ 'Name.Text' : { "$regex": req.params.search } }, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            console.log(req.query.currentLang);
            res.send(col);

        });
    }
    

};
exports.getUnivirstyById = function (req, res) {
    Univirsty.findOne({_id:req.params.id}).populate('ModifiedBy').exec(function (err, col) {
        res.send(col);
    });
};

exports.createUnivirsty = function (req, res, next) {
    var univirstyData = req.body;
    
    Univirsty.create(univirstyData, function (err, univirsty) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate Univirsty');
            }
            res.status(400);
            
            return res.send({ reason: err.toString() });
        }
        res.send(univirsty);
    });
};

exports.updateUnivirsty = function (req, res, next) {
    console.log(req.params[0]);
    var univirstyData = req.body;
    var query = { _id: univirstyData._id };
    Univirsty.update(query, univirstyData, function (err, univirsty) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate job Seeker Name');
            }
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(univirsty);
    });
};