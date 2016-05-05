var Address = require('mongoose').model('Address');
var JobSeeker = require('mongoose').model('JobSeeker');

exports.getAddresses = function (req, res) {
    //Address.find({}).exec(function (err, col) {
    //    res.send(col);
    //});
    if (isAdmin(req)) {
        Address.find({}).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            res.send(col);
        });
    } else if (req.query.jobSeeker) {
        
        console.log('req.user' + req.user);
        Address.find({ JobSeeker: req.query.jobSeeker }).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            res.send(col);
        });
    } else {
        
        console.log('req.user' + req.user);
        Address.find({ CreatedBy: req.user }).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
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

exports.getAddressById = function (req, res) {
    Address.findOne({ _id: req.params.id }).populate('ModifiedBy').exec(function (err, col) {
        console.log(col);
        res.send(col);
    });
};

exports.createAddress = function (req, res) {
    var addressData = req.body;
    
    Address.create(addressData, function (err, address) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate Address');
            }
            res.status(400);
            
            return res.send({ reason: err.toString() });
        }
        // Address.find({ CreatedBy: req.user }).populate('ModifiedBy').populate('CreatedBy').exec(function (err, Addresses) {
        
        return JobSeeker.find({ CreatedBy: req.user, MobileNo: { $nin: [""] } }).populate('ModifiedBy').populate('CreatedBy').exec(function (err, jobSeekers) {
            jobSeekers[0]._doc.Address.push(address._id);
            var query = { _id: jobSeekers[0]._doc._id };
            var jobSeekerData = {
               // "MobileNo": "777777777888888", 
                "Address": jobSeekers[0]._doc.Address
            };
            //jobSeekerData[3]._doc.MobileNo="555555555";
            
              JobSeeker.update(query, jobSeekerData, function (err, jobSeeker) {
                if (err) {
                    if (err.toString().indexOf('E11000') > -1) {
                        err = new Error('Duplicate job Seeker Name');
                    }
                    res.status(400);
                    return res.send({ reason: err.toString() });
                }
                res.send(address);
                //res.send(jobSeeker);
            });
            //res.send(col);
        });
        //res.send(col);
         //});
        //res.send(address);
    });
};

exports.updateAddress = function (req, res) {
    console.log(req.params[0]);
    var addressData = req.body;
    var query = { _id: addressData._id };
    Address.update(query, addressData, function (err, address) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate Address');
            }
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(address);
    });
};