angular.module('app').controller('mvEducationalInformationCtrl'
    , function ($scope, mvNotifier, mvEducationalInformationRepo, mvEducationalInformation, mvIdentity, mvGender, $routeParams, $location) {
    
    var id = $routeParams.id;
    $scope.addEnabled = false;
    
    if (id) {
        $scope.educationalInformation = mvEducationalInformation.get({ _id: id }, (function () {
            $scope.updateMode = true;
            $scope.addMode = false;
            
            $scope.educationalInformation.BirthDate = new Date($scope.educationalInformation.BirthDate);
        }));
    } else {
        $scope.educationalInformation = new mvEducationalInformation();
        $scope.educationalInformation.JobSeeker = mvIdentity.currentJobSeeker;
        $scope.updateMode = false;
        $scope.addMode = true;
        $scope.addEnabled = true;
    }
    
    $scope.update = function () {
        if ($scope.educationalInformationForm.$valid) {
            mvEducationalInformationRepo.updateCurrentEducationalInformation($scope.educationalInformation).then(function () {
                mvNotifier.notify('Educational Information has been updated!');
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
    };
    
    $scope.add = function () {
        if ($scope.educationalInformationForm.$valid && $scope.addEnabled) {
            mvEducationalInformationRepo.createEducationalInformation($scope.educationalInformation).then(function () {
                mvNotifier.notify('New Educational Information Added!');
                $scope.addEnabled = false;
                $location.path('/updateJobSeeker/EducationalInformations/' + mvIdentity.currentJobSeeker._id);
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
    };
     
});