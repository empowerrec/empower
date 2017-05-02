angular.module('app').controller('mvPackageFeatureDetailCtrl', function ($scope, mvPackageFeature, $routeParams) {
    $scope.PackageFeature = mvPackageFeature.get({_id: $routeParams.pfid});
});