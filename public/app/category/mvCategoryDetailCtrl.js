angular.module('app').controller('mvCategoryDetailCtrl', function ($scope, mvCategory, $routeParams) {
    $scope.category = mvCategory.get({_id: $routeParams.id});
});