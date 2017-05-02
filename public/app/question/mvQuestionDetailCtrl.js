angular.module('app').controller('mvQuestionDetailCtrl', function ($scope, mvQuestion, $routeParams) {
    $scope.Question = mvQuestion.get({_id: $routeParams.id});
});