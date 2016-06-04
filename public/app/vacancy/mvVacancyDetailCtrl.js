angular.module('app').controller('mvVacancyDetailCtrl', function ($scope, mvVacancy, $routeParams) {
    $scope.vacancy = mvVacancy.getForDetail({_id: $routeParams.id});
});