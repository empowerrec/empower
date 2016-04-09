angular.module('app').controller('mvJobSeekerDetailCtrl', function ($scope, mvEmployer, $routeParams) {
    $scope.employer = mvEmployer.get({_id: $routeParams.id});
});