angular.module('app').controller('mvNationalityDetailCtrl', function ($scope, mvNationality, $routeParams) {
    $scope.nationality = mvNationality.get({_id: $routeParams.id});
});