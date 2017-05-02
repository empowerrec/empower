angular.module('app').controller('mvUserFeatureDetailCtrl', function ($scope, mvUserFeature, $routeParams) {
    $scope.UserFeature = mvUserFeature.get({_id: $routeParams.pfid});
});