angular.module('app').controller('mvEducationalLevelDetailCtrl', function ($scope, mvEducationalLevel, $routeParams) {
    $scope.educationalLevel = mvEducationalLevel.get({_id: $routeParams.id});
});