angular.module('app').controller('mvJobSeekerListCtrl', function ($scope, mvJobSeeker, mvIdentity) {
    $scope.currentUser = mvIdentity.currentUser;
    $scope.jobSeekers = mvJobSeeker.query();
    console.log($scope.jobSeekers);
    $scope.sortOptions = [{value: 'BirthDate', text: 'Sort by Birth Date'},
        {value: 'Gender', text: 'Sort by Gender'}];
    $scope.sortOrder = $scope.sortOptions[0].value;

});
