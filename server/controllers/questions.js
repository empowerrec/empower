var Question = require('mongoose').model('Question');

exports.getQuestions = function (req, res) {
    
    var currentPage = parseInt(req.query.currentPage) > 0 ? parseInt(req.query.currentPage) : 1,
        pageSize = parseInt(req.query.pageSize) > 0 ? parseInt(req.query.pageSize) : 10;
    
    if (req.query.currentLang) {
        Question.find({ 'Name.Lang': { "$eq": req.query.currentLang } }, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').exec(function (err, col) {
            res.send(col);
        });
    } else {
        console.log(req.query.query);
        Question.find(JSON.parse(req.query.query))
            .populate('Country').populate('ModifiedBy').populate('CreatedBy')
            .limit(pageSize).skip(pageSize * (currentPage - 1))
            .exec(function (err, col) {
            Question.count(JSON.parse(req.query.query)).exec(function (errr, count) {
                res.send([{ collection: col, allDataCount: count }]);
            });
        });
    }
    
};

exports.getQuestionById = function (req, res) {
    Question.findOne({ _id: req.params.id }).populate('ModifiedBy').exec(function (err, col) {
        res.send(col);
    });
};

exports.createQuestion = function (req, res, next) {
    var QuestionData = req.body;
    
    Question.create(QuestionData, function (err, Question) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate Question');
            }
            res.status(400);
            
            return res.send({ reason: err.toString() });
        }
        res.send(Question);
    });
};

exports.getQuestionByName = function (req, res) {

    if (req.query.currentLang && req.query.Confirmed) {
        Question.find({ 'Name.Lang': { "$eq": req.query.currentLang }, 'Name.Text': { "$regex": req.params.search }, 'Confirmed': { "$eq": req.query.Confirmed }  }, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').exec(function(err, col) {

            res.send(col);

        });
    } else if (req.query.currentLang) {
        Question.find({ 'Name.Lang': { "$eq": req.query.currentLang }, 'Name.Text': { "$regex": req.params.search } }, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').exec(function(err, col) {

            res.send(col);

        });
    } else {
        Question.find({ 'Name.Text': { "$regex": req.params.search } }, { 'Name.$': 1 }).populate('ModifiedBy').populate('CreatedBy').exec(function(err, col) {

            res.send(col);

        });
    }


};

exports.updateQuestion = function (req, res, next) {
   
    var QuestionData = req.body;
    var query = { _id: QuestionData._id };
    Question.update(query, QuestionData, function (err, Question) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate job Seeker Name');
            }
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(Question);
    });
};