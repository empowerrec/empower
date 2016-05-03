angular.module('app').controller('mvJobRoleDetailCtrl', function ($scope, mvJobRole, $routeParams) {
    $scope.jobRole = mvJobRole.get({_id: $routeParams.id});
});