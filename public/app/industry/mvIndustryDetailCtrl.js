angular.module('app').controller('mvIndustryDetailCtrl', function ($scope, mvIndustry, $routeParams) {
    $scope.industry = mvIndustry.get({_id: $routeParams.id});
});