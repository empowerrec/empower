angular.module('app').controller('mvInterestDetailCtrl', function ($scope, mvInterest, $routeParams) {
    $scope.interest = mvInterest.get({_id: $routeParams.id});
});