var SubUserInvitationDetail = require('mongoose').model('SubUserInvitationDetail');
//Get All subUserInvitationDetail
exports.getSubUserInvitationDetails = function (req, res) {
    
    var currentPage = parseInt(req.query.currentPage) > 0 ? parseInt(req.query.currentPage) : 1,
        pageSize = parseInt(req.query.pageSize) > 0 ? parseInt(req.query.pageSize) : 10;
    if (req.query.currentLang) {

        SubUserInvitationDetail.find({ 'Name.Lang': { "$eq": req.query.currentLang } }, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').exec(function(err, col) {
            res.send(col);
        });
    } else {
        SubUserInvitationDetail.find(JSON.parse(req.query.query))
            .populate('ModifiedBy').populate('CreatedBy')
            .limit(pageSize).skip(pageSize * (currentPage - 1))
            .exec(function(err, col) {
                SubUserInvitationDetail.count(JSON.parse(req.query.query)).exec(function(errr, count) {
                    res.send([{ collection: col, allDataCount: count }]);
                });
            });
    }
};

exports.getSubUserInvitationDetailById = function(req, res) {
    SubUserInvitationDetail.findOne({_id: req.params.id}).populate('ModifiedBy').exec(function(err, col) {

        

        res.send(col);
    });
};

exports.createSubUserInvitationDetail = function (req, res, next) {
    var subUserInvitationData = req.body;

    SubUserInvitationDetail.create(subUserInvitationData, function (err, subUserInvitationDetail) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate SubUserInvitationDetail');
            }
            res.status(400);

            return res.send({reason: err.toString()});
        }
        res.send(subUserInvitationDetail);
    });
};

exports.updateSubUserInvitationDetail = function (req, res, next) {
   
    var subUserInvitationData = req.body;
    var query = { _id: subUserInvitationData._id };
    SubUserInvitationDetail.update(query,subUserInvitationData, function (err, subUserInvitationDetail) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate User Name');
            }
            res.status(400);
            return res.send({reason: err.toString()});
        }
        res.send(subUserInvitationDetail);
    });
};