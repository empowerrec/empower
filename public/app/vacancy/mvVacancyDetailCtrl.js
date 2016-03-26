angular.module('app').controller('mvVacancyDetailCtrl', function ($scope, mvVacancy, $routeParams) {
    $scope.vacancy = mvVacancy.get({_id: $routeParams.id});
});