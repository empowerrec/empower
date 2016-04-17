var Vacancy = require('mongoose').model('Vacancy');
//var mvIdentity = require('users');
exports.getVacancies = function (req, res) {
    if (isAdmin(req)) {
        //console.log('UserDetai44' + req.user.UserType);
        //console.log('mvIdentity.currentUser' +req.body.username);
        Vacancy.find({}).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            res.send(col);
        });
    } else {
        console.log('UserDetai5 8' + req.user.UserType);
        //Vacancy.find({}).exec(function (err, col) {
        //    res.send(col);
        //});
        console.log('req.user' + req.user);
        Vacancy.find({CreatedBy: req.user}).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            res.send(col);
        });
    }
   
};

exports.getVacancyById = function (req, res) {
    Vacancy.findOne({_id:req.params.id}).exec(function (err, col) {
        res.send(col);
    });
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
exports.createVacancy = function (req, res, next) {
    var vacancyData = req.body;

    Vacancy.create(vacancyData, function (err, vacancy) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate Vacancy');
            }
            res.status(400);

            return res.send({reason: err.toString()});
        }
        res.send(vacancy);
    });
};

exports.updateVacancy = function (req, res, next) {
    console.log(req.params[0]);
    var vacancyData = req.body;
    var query = { _id: vacancyData._id };
    Vacancy.update(query,vacancyData, function (err, vacancy) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate Vacancy Name');
            }
            res.status(400);
            return res.send({reason: err.toString()});
        }
        res.send(vacancy);
    });
};