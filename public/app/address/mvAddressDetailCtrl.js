angular.module('app').controller('mvAddressDetailCtrl', function ($scope, mvAddress, $routeParams) {
    $scope.address = mvAddress.get({_id: $routeParams.id});
});