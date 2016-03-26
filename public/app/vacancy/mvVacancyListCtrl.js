angular.module('app').controller('mvVacancyListCtrl', function ($scope, mvVacancy) {
    $scope.vacancies = mvVacancy.query();

    $scope.sortOptions = [{value: 'VacancyDescription', text: 'Sort by VacancyDescription'}];
    $scope.sortOrder = $scope.sortOptions[0].value;
});