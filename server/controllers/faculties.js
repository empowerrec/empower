var Faculty = require('mongoose').model('Faculty');

exports.getFaculties = function (req, res) {
    var currentPage = parseInt(req.query.currentPage) > 0 ? parseInt(req.query.currentPage) : 1,
        pageSize = parseInt(req.query.pageSize) > 0 ? parseInt(req.query.pageSize) : 10;
    
    if (req.query.currentLang) {
        Faculty.find({ 'Name.Lang': { "$eq": req.query.currentLang } }, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            res.send(col);
        });
    } else {
        Faculty.find(JSON.parse(req.query.query))
            .populate('ModifiedBy').populate('CreatedBy')
            .limit(pageSize).skip(pageSize * (currentPage - 1))
            .exec(function (err, col) {
            Faculty.count(JSON.parse(req.query.query)).exec(function (errr, count) {
                res.send([{ collection: col, allDataCount: count }]);
            });
        });
    }
    

};

exports.getFacultyByName = function (req, res) {
    
    
    if (req.query.currentLang) {
        Faculty.find({ 'Name.Lang': { "$eq": req.query.currentLang } , 'Name.Text' : { "$regex": req.params.search } }, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            
            res.send(col);

        });
    } else {
        Faculty.find({ 'Name.Text' : { "$regex": req.params.search } }, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            
            res.send(col);

        });
    }
    

};
exports.getFacultyById = function (req, res) {
    Faculty.findOne({_id:req.params.id}).populate('ModifiedBy').exec(function (err, col) {
        res.send(col);
    });
};

exports.createFaculty = function (req, res, next) {
    var facultyData = req.body;
    
    Faculty.create(facultyData, function (err, faculty) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate Faculty');
            }
            res.status(400);
            
            return res.send({ reason: err.toString() });
        }
        res.send(faculty);
    });
};

exports.updateFaculty = function (req, res, next) {
    
    var facultyData = req.body;
    var query = { _id: facultyData._id };
    Faculty.update(query, facultyData, function (err, faculty) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate job Seeker Name');
            }
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(faculty);
    });
};