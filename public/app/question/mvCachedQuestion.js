angular.module('app').factory('mvCachedQuestion', function (mvQuestion) {
    var QuestionList;
    return {
        query: function () {
            if (!QuestionList) {
                QuestionList = mvQuestion.query();
            }
            return QuestionList;
        }
    };
});