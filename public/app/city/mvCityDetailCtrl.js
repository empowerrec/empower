angular.module('app').controller('mvCityDetailCtrl', function ($scope, mvCity, $routeParams) {
    $scope.city = mvCity.get({_id: $routeParams.id});
});