angular.module('app').controller('mvEmployerDetailCtrl', function ($scope, mvEmployer, $routeParams) {
    $scope.employer = mvEmployer.get({_id: $routeParams.id});
});