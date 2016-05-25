angular.module('app').controller('mvUnivirstyDetailCtrl', function ($scope, mvUnivirsty, $routeParams) {
    $scope.univirsty = mvUnivirsty.get({_id: $routeParams.id});
});