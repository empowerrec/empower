var ContactVia = require('mongoose').model('ContactVia');

exports.getContactVias = function (req, res) {
    if (req.query.currentLang) {
        ContactVia.find({ 'Name.Lang': { "$eq": req.query.currentLang } }, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            res.send(col);
        });
    } else {
        ContactVia.find({}).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            res.send(col);
        });
    }
};

exports.getContactViaById = function (req, res) {
    ContactVia.findOne({_id:req.params.id}).populate('ModifiedBy').exec(function (err, col) {
        res.send(col);
    });
};

exports.createContactVia = function (req, res) {
    var contactViaData = req.body;
    
    ContactVia.create(contactViaData, function (err, contactVia) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate ContactVia');
            }
            res.status(400);
            
            return res.send({ reason: err.toString() });
        }
        res.send(contactVia);
    });
};

exports.updateContactVia = function (req, res) {
    
    var contactViaData = req.body;
    var query = { _id: contactViaData._id };
    ContactVia.update(query, contactViaData, function (err, contactVia) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate job Seeker Name');
            }
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(contactVia);
    });
};