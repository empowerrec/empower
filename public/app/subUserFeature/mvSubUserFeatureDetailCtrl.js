angular.module('app').controller('mvSubUserFeatureDetailCtrl', function ($scope, mvSubUserFeature, $routeParams) {
    $scope.SubUserFeature = mvSubUserFeature.get({_id: $routeParams.pfid});
});