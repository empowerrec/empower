angular.module('app').controller('mvJobSeekerCtrl', function ($scope, mvNotifier, mvJobSeekerRepo, mvJobSeeker, $routeParams) {
    
    var id = $routeParams.id;
    
    $scope.genders = [
        { value: 'Male', text: 'Male' },
        { value: 'Female', text: 'Female' }
    ];
    
    $scope.addEnabled = false;
    
    if (id) {
        $scope.jobSeeker = mvJobSeeker.get({ _id: id }, (function () {
            $scope.updateMode = true;
            $scope.addMode = false;
            
            if (!$scope.jobSeeker.Gender) {
                $scope.jobSeeker.Gender = $scope.genders[0].value;
            }
        }));
    } else {
        
        $scope.jobSeeker = new mvJobSeeker();
        
        $scope.jobSeeker.Gender = $scope.genders[0].value;

        $scope.updateMode = false;
        $scope.addMode = true;
        $scope.addEnabled = true;
    }
    
    $scope.update = function () {
        if ($scope.jobSeekeForm.$valid) {
            mvJobSeekerRepo.updateCurrentJobSeeker($scope.jobSeeker).then(function () {
                mvNotifier.notify('JobSeeker has been updated!');
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
    };
    
    $scope.add = function () {
        if ($scope.jobSeekeForm.$valid && addEnabled) {
            mvJobSeekerRepo.createJobSeeker($scope.jobSeeker).then(function () {
                mvNotifier.notify('New JobSeeker Added!');
                $scope.addEnabled = false;
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
    };
     
});