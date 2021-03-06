var SubUserInvitation = require('mongoose').model('SubUserInvitation');
var sendMail = require('../config/mailer');
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var config = require('../config/config')[env];
//Get All subUserInvitation
exports.getSubUserInvitations = function (req, res) {
    
    var currentPage = parseInt(req.query.currentPage) > 0 ? parseInt(req.query.currentPage) : 1,
        pageSize = parseInt(req.query.pageSize) > 0 ? parseInt(req.query.pageSize) : 10;
    if (req.query.currentLang) {

        SubUserInvitation.find({
            'Name.Lang': { "$eq": req.query.currentLang },
            'Employer': { "$eq": req.query.Employer }}, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            res.send(col);
        });
    } else {
        SubUserInvitation.find(JSON.parse(req.query.query))
            .populate('ModifiedBy').populate('CreatedBy')
            .limit(pageSize).skip(pageSize * (currentPage - 1))
            .exec(function(err, col) {
                SubUserInvitation.count(JSON.parse(req.query.query)).exec(function(errr, count) {
                    res.send([{ collection: col, allDataCount: count }]);
                });
            });
    }
};

exports.getSubUserInvitationById = function(req, res) {
    SubUserInvitation.findOne({_id: req.params.id}).populate('ModifiedBy').exec(function(err, col) {

        

        res.send(col);
    });
};

exports.createSubUserInvitation = function (req, res, next) {
    var subUserInvitationData = req.body;

    SubUserInvitation.create(subUserInvitationData, function (err, subUserInvitation) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate SubUserInvitation');
            }
            res.status(400);

            return res.send({reason: err.toString()});
        }

        
        var template = "./public/templates/subuserinvitation.txt"  // path to template name
        var data = {
            "subUserInvitationId": subUserInvitation._id,
            "appurl": config.AppURL
        };

        sendMail.sendMail('ali7ussein@live.com', subUserInvitation.Email, 'Sub User Invitation at Toptalents.online', '', template , data);
        res.send(subUserInvitation);
    });
};

exports.updateSubUserInvitation = function (req, res, next) {
   
    var subUserInvitationData = req.body;
    var query = { _id: subUserInvitationData._id };
    SubUserInvitation.update(query,subUserInvitationData, function (err, subUserInvitation) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate User Name');
            }
            res.status(400);
            return res.send({reason: err.toString()});
        }
        res.send(subUserInvitation);
    });
};