angular.module('app').controller('mvExperianceDetailCtrl', function ($scope, mvExperiance, $routeParams) {
    $scope.experiance = mvExperiance.get({_id: $routeParams.id});
});