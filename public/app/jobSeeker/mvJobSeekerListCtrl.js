angular.module('app').controller('mvJobSeekerListCtrl', function ($scope, mvJobSeeker, mvIdentity) {
    $scope.currentUser = mvIdentity.currentUser;
    $scope.jobSeekers = mvJobSeeker.query();
    $scope.sortOptions = [{value: 'EmployerName', text: 'Sort by EmployerName'},
        {value: 'NumberOfEmployees', text: 'Sort by NumberOfEmployees'}];
    $scope.sortOrder = $scope.sortOptions[0].value;

});
