angular.module('app').controller('mvPackageDetailCtrl', function ($scope, mvPackage, $routeParams) {
    $scope.Package = mvPackage.get({_id: $routeParams.id});
});