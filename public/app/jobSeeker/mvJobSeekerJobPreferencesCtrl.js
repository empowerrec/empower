angular.module('app').controller('mvJobSeekerJobPreferencesCtrl'
    , function ($scope, mvNotifier, mvJobSeekerRepo, mvJobSeeker, mvGender, $routeParams, $rootScope) {
    
    var id = $routeParams.id;
    $scope.addEnabled = false;
    
    if (id) {
        $rootScope.jobSeeker = mvJobSeeker.get({ _id: id }, (function () {
            $scope.updateMode = true;
            $scope.addMode = false;            
        }));
    } else {
         $rootScope.jobSeeker = new mvJobSeeker();
        
         $rootScope.jobSeeker.Deleted = false;
        $scope.updateMode = false;
        $scope.addMode = true;
        $scope.addEnabled = true;
    }
    
    $scope.update = function () {
        if ($scope.jobSeekerForm.$valid) {
            mvJobSeekerRepo.updateCurrentJobSeeker( $rootScope.jobSeeker).then(function () {
                mvNotifier.notify('JobSeeker has been updated!');
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
    };
    
    $scope.add = function () {
        if ($scope.jobSeekerForm.$valid && $scope.addEnabled) {
            mvJobSeekerRepo.createJobSeeker( $rootScope.jobSeeker).then(function () {
                mvNotifier.notify('New JobSeeker Added!');
                $scope.addEnabled = false;
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
    };
     
});