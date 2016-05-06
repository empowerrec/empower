var Experiance = require('mongoose').model('Experiance');

exports.getExperiances = function (req, res) {
    
     if (req.query.jobSeeker) {
        
        console.log('Job Seeker');
        console.log(req.query.jobSeeker);
        Experiance.find({ JobSeeker: req.query.jobSeeker }).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            res.send(col);
        });
    }else if (isAdmin(req)) {
        console.log('Admin');
        Experiance.find({}).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            res.send(col);
        });
    } else {
        
        console.log('Other');
        Experiance.find({ CreatedBy: req.user }).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            res.send(col);
        });
    }
    
    
};
function isAdmin(req) {
    console.log('UserDetai2' + req.user.UserType);
    
    for (var role in req.user.UserType) {
        console.log('UserDetai3' + req.user.UserType[role]);
        if (req.user.UserType[role] == 'A') {
            return true;
        }
    }
}

exports.getExperianceById = function (req, res) {
    if (req.params.id == 'profile') {
        console.log(req.user);
        Experiance.findOne({ User: req.user }).populate('ModifiedBy').exec(function (err, col) {
            console.log(col);
            res.send(col);
        });
    } else {
        Experiance.findOne({ _id: req.params.id }).populate('ModifiedBy').exec(function (err, col) {
            console.log(col);
            res.send(col);
        }); 
    }
    
};

exports.createExperiance = function (req, res, next) {
    var experianceData = req.body;

    Experiance.create(experianceData, function (err, experiance) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate Experiance');
            }
            res.status(400);

            return res.send({reason: err.toString()});
        }
        res.send(experiance);
    });
};

exports.updateExperiance = function (req, res, next) {
    console.log(req.params[0]);
    var experianceData = req.body;
    var query = { _id: experianceData._id };
    Experiance.update(query,experianceData, function (err, experiance) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate User Name');
            }
            res.status(400);
            return res.send({reason: err.toString()});
        }
        res.send(experiance);
    });
};