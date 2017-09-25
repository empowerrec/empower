var ReferenceRelationship = require('mongoose').model('ReferenceRelationship');

exports.getReferenceRelationships = function (req, res) {
    var currentPage = parseInt(req.query.currentPage) > 0 ? parseInt(req.query.currentPage) : 1,
        pageSize = parseInt(req.query.pageSize) > 0 ? parseInt(req.query.pageSize) : 10;
    if (req.query.currentLang) {
        
        ReferenceRelationship.find({ 'Name.Lang': { "$eq": req.query.currentLang } }, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            res.send(col);
        });
    } else {
        ReferenceRelationship.find(JSON.parse(req.query.query))
            .populate('ModifiedBy').populate('CreatedBy')
            .limit(pageSize).skip(pageSize * (currentPage - 1))
            .exec(function (err, col) {
            ReferenceRelationship.count(JSON.parse(req.query.query)).exec(function (errr, count) {
                res.send([{ collection: col, allDataCount: count }]);
            });
        });
    }
};

exports.getReferenceRelationshipById = function (req, res) {
    ReferenceRelationship.findOne({_id: req.params.id}).populate('ModifiedBy').exec(function(err, col) {

        res.send(col);
    });
};

exports.createReferenceRelationship = function (req, res, next) {
    var ReferenceRelationshipData = req.body;

    ReferenceRelationship.create(ReferenceRelationshipData, function (err, ReferenceRelationship) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate ReferenceRelationship');
            }
            res.status(400);

            return res.send({reason: err.toString()});
        }
        res.send(ReferenceRelationship);
    });
};

exports.updateReferenceRelationship = function (req, res, next) {
   
    var ReferenceRelationshipData = req.body;
    var query = { _id: ReferenceRelationshipData._id };
    ReferenceRelationship.update(query,ReferenceRelationshipData, function (err, ReferenceRelationship) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate User Name');
            }
            res.status(400);
            return res.send({reason: err.toString()});
        }
        res.send(ReferenceRelationship);
    });
};