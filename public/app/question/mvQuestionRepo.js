angular.module('app').factory('mvQuestionRepo', function ($http, $q, mvQuestion,mvIdentity) {
    return {

        createQuestion: function (newQuestionData) {
            var newQuestion = new mvQuestion(newQuestionData);
            newQuestion.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving Question");
            newQuestion.$save().then(function () {
                console.log("Question Saved");
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        createQuestionAfterCreatingUser: function (newQuestionData) {
            var newQuestion = new mvQuestion(newQuestionData);
            var dfd = $q.defer();
            console.log("Saving Question");
            newQuestion.$save().then(function (Question) {
                console.log("Question Saved");
                mvIdentity.currentQuestion = Question;
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        updateCurrentQuestion: function (newQuestionData) {
            newQuestionData.ModifiedBy = mvIdentity.currentUser;

            var dfd = $q.defer();

            var clone = angular.copy(newQuestionData);
            angular.extend(clone,newQuestionData);
            clone.$update({currentUser:mvIdentity.currentUser}).then(function () {

                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    };
});