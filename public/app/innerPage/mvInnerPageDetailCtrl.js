angular.module('app').controller('mvInnerPageDetailCtrl', function ($scope, mvInnerPage, $routeParams) {
    $scope.innerPage = mvInnerPage.get({_id: $routeParams.id});
});