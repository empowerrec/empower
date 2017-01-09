var Address = require('mongoose').model('Address');
var JobSeeker = require('mongoose').model('JobSeeker');

exports.getAddresses = function (req, res) {    
    var currentPage = parseInt(req.query.currentPage) > 0 ? parseInt(req.query.currentPage) : 1,
        pageSize = parseInt(req.query.pageSize) > 0 ? parseInt(req.query.pageSize) : 10;
    
    if (req.query.jobSeeker) {
        Address.find(JSON.parse(req.query.query)).populate('Country').populate('City').populate('Area')
            .populate('ModifiedBy').populate('CreatedBy')
            .limit(pageSize)
            .skip(pageSize * (currentPage - 1))
            .exec(function (err, col) { 
            Address.count(JSON.parse(req.query.query)).exec(function (errr, count) {
                res.send([{ collection: col, allDataCount: count }]);
            });
        });
    }else if (isAdmin(req)) {
        Address.find({ Deleted: false }).populate('Country').populate('City').populate('Area').populate('ModifiedBy')
            .populate('CreatedBy')
            .limit(pageSize)
            .skip(pageSize * (currentPage - 1))
            .exec(function (err, col) {
            Address.count({ Deleted: false }).exec(function (errr, count) {
                res.send([{ collection: col, allDataCount: count }]);
            });
        });
    } else {
        Address.find({ CreatedBy: req.user, Deleted: false }).populate('Country').populate('City')
            .populate('Area').populate('ModifiedBy').populate('CreatedBy')
            .limit(pageSize)
            .skip(pageSize * (currentPage - 1))
            .exec(function (err, col) {
            Address.count({ CreatedBy: req.user, Deleted: false }).exec(function (errr, count) {
                res.send([{ collection: col, allDataCount: count }]);
            });
        });
    }
};
function isAdmin(req) {
   
    
    for (var role in req.user.UserType) {
        
        if (req.user.UserType[role] == 'A') {
            return true;
        }
    }
}

exports.getAddressById = function (req, res) {
    Address.findOne({ _id: req.params.id }).populate('City').populate('Area').populate('ModifiedBy').exec(function (err, col) {
        
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

exports.updateAddressCity = function (req, res) {
    console.log("Update City");
    var ids = req.params.id.split("_");
    var newCityId = ids[0];
    var oldCityId = ids[1];//city for change to newCityId
    Address.find({ City: oldCityId }).exec(function (err, col) {
        col.forEach(function (entry) {
            var query = { _id: entry._id };
            entry.City = newCityId;
            Address.update(query, entry, function (err, address) {
                if (err) {
                    if (err.toString().indexOf('E11000') > -1) {
                        err = new Error('Duplicate Address');
                    }
                    res.status(400);
                    return res.send({ reason: err.toString() });
                }
                
            });

        });
        res.send(col);
    });


};

exports.updateAddressArea = function (req, res) {
    console.log("Update Area");
    var ids = req.params.id.split("_");
    var newAreaId = ids[0];
    var oldAreaId = ids[1];
    Address.find({ Area: oldAreaId }).exec(function(err, col) {
        col.forEach(function (entry) {
            var query = { _id: entry._id };
            entry.Area = newAreaId;
            Address.update(query, entry, function(err, address) {
                if (err) {
                    if (err.toString().indexOf('E11000') > -1) {
                        err = new Error('Duplicate Address');
                    }
                    res.status(400);
                    return res.send({ reason: err.toString() });
                }
                
            });

        });
        res.send(col);
    });


};