angular.module('app').controller('mvJobTypeDetailCtrl', function ($scope, mvJobType, $routeParams) {
    $scope.jobType = mvJobType.get({_id: $routeParams.id});
});