angular.module('app').controller('mvFeatureDetailCtrl', function ($scope, mvFeature, $routeParams) {
    $scope.Feature = mvFeature.get({_id: $routeParams.id});
});