angular.module('app').controller('mvJobSeekerCtrl', function ($scope, $routeParams, mvExperiance, mvCourse, mvIdentity,mvAddress, mvJobSeeker, mvEducationalInformation) {

    $scope.currentUser = mvIdentity.currentUser;
    var id = $routeParams.id;
    if (id) {
        mvIdentity.currentJobSeeker = mvJobSeeker.get({ _id: id }, (function () {
            $scope.active = 0;
            $scope.currentUser = mvIdentity.currentUser;
            $scope.experiances = mvExperiance.query({ jobSeeker: mvIdentity.currentJobSeeker._id });
            $scope.addresses = mvAddress.query({ jobSeeker: mvIdentity.currentJobSeeker._id });
            $scope.educationalInformations = mvEducationalInformation.query({ jobSeeker: mvIdentity.currentJobSeeker._id });
            $scope.courses = mvCourse.query({ jobSeeker: mvIdentity.currentJobSeeker._id });
            console.log($routeParams.tab);
            console.log("Current Job Seeker");
            console.log(mvIdentity.currentJobSeeker);
        }));
        
    } 
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
        case 'Courses':
            $scope.active = 5;
            break;        
    }
});