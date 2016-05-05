angular.module('app').controller('mvJobSeekerCtrl', function ($scope, $routeParams, mvExperiance, mvCourse, mvIdentity,mvAddress) {
    
    $scope.active = 0;
    $scope.currentUser = mvIdentity.currentUser;
    $scope.experiances = mvExperiance.query();
    $scope.addresses = mvAddress.query();
    $scope.courses = mvCourse.query();
    console.log($routeParams.tab);
    switch ($routeParams.tab) {
        case 'PersonalInformation':
            $scope.active = 0;
            break;
        case 'EducationalInformation':
            $scope.active = 1;
            break;
        case 'ContactInformation':
            $scope.active = 2;
            break;
        case 'Experiances':
            $scope.active = 3;
            break;
        //case 'Experiances':
        //    $scope.active = 3;
        //    break;        
    }
});