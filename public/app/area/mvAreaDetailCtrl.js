angular.module('app').controller('mvAreaDetailCtrl', function ($scope, mvArea, $routeParams) {
    $scope.area = mvArea.get({_id: $routeParams.id});
});