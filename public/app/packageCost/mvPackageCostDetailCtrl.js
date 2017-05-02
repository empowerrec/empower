angular.module('app').controller('mvPackageCostDetailCtrl', function ($scope, mvPackageCost, $routeParams) {
    $scope.PackageCost = mvPackageCost.get({_id: $routeParams.pfid});
});