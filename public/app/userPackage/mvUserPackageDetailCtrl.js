angular.module('app').controller('mvUserPackageDetailCtrl', function ($scope, mvUserPackage, $routeParams) {
    $scope.UserPackage = mvUserPackage.get({_id: $routeParams.pfid});
});