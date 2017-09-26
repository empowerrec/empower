angular.module('app').controller('mvTravelPreferenceDetailCtrl', function ($scope, mvTravelPreference, $routeParams) {
    $scope.TravelPreference = mvTravelPreference.get({_id: $routeParams.id});
});