angular.module('app').controller('mvEducationalInformationListCtrl', function ($scope, mvEducationalInformation,$translate, mvIdentity) {
    $scope.currentUser = mvIdentity.currentUser;
    $scope.educationalInformations = mvEducationalInformation.query({ jobSeeker: mvIdentity.currentJobSeeker });
    $scope.sortOptions = [{value: 'EducationalInformationName', text: 'Sort by EducationalInformationName'},
        {value: 'NumberOfEmployees', text: 'Sort by NumberOfEmployees'}];
    $scope.sortOrder = $scope.sortOptions[0].value;
});
