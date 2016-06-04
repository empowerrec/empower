var Employer = require('mongoose').model('Employer');

//exports.getEmployers = function (req, res) {
//    Employer.find({}).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
//        res.send(col);
//    });
//};

exports.getEmployers = function (req, res) {
    
    var currentPage = parseInt(req.query.currentPage) > 0 ? parseInt(req.query.currentPage) : 1,
        pageSize = parseInt(req.query.pageSize) > 0 ? parseInt(req.query.pageSize) : 10;
    
    Employer.find(JSON.parse(req.query.query))
            .populate('Country').populate('ModifiedBy').populate('CreatedBy')
            .limit(pageSize).skip(pageSize * (currentPage - 1))
            .exec(function (err, col) {
        Employer.count(JSON.parse(req.query.query)).exec(function (errr, count) {
            res.send([{ collection: col, allDataCount: count }]);
        });
    });
   
};

exports.getEmployerById = function (req, res) {
    if (req.params.id == 'profile') {
       
        Employer.findOne({ User: req.user }).populate('ModifiedBy').exec(function (err, col) {
         
            res.send(col);
        });
    } else {
        Employer.findOne({ _id: req.params.id }).populate('ModifiedBy').exec(function (err, col) {
            
            res.send(col);
        }); 
    }
    
};

exports.getEmployerByUser = function (req, res) {
    Employer.findOne({ User: req.user }).populate('ModifiedBy').exec(function(err, col) {
       
        res.send(col);
    });

};

exports.createEmployer = function (req, res, next) {
    var employerData = req.body;

    Employer.create(employerData, function (err, employer) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate Employer');
            }
            res.status(400);

            return res.send({reason: err.toString()});
        }
        res.send(employer);
    });
};

exports.updateEmployer = function (req, res, next) {
    
    var employerData = req.body;
    var query = { _id: employerData._id };
    Employer.update(query,employerData, function (err, employer) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate User Name');
            }
            res.status(400);
            return res.send({reason: err.toString()});
        }
        res.send(employer);
    });
};