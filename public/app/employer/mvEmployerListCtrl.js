angular.module('app').controller('mvEmployerListCtrl', function ($scope, mvEmployer) {
    $scope.employers = mvEmployer.query();

    $scope.sortOptions = [{value: 'EmployerName', text: 'Sort by EmployerName'},
        {value: 'NumberOfEmployees', text: 'Sort by NumberOfEmployees'}];
    $scope.sortOrder = $scope.sortOptions[0].value;
});