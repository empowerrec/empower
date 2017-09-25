angular.module('app').controller('mvJobSeekerContactInformationCtrl', function ($scope, mvNotifier, mvJobSeekerRepo, mvJobSeeker, $routeParams, $rootScope) {
    
    var id = $routeParams.id;
    
    $scope.genders = [
        { value: 'Male', text: 'Male' },
        { value: 'Female', text: 'Female' }
    ];
    
    $scope.addEnabled = false;
    $scope.IsMobileInserted = false;
    // $rootScope.jobSeekers = mvJobSeeker.query();

   

    var id = $routeParams.id;
    $scope.addEnabled = false;

    if (id) {
        $rootScope.jobSeeker = mvJobSeeker.get({ _id: id }, (function () {
            $scope.updateMode = true;
            $scope.addMode = false;
            $rootScope.jobSeeker.BirthDate = new Date($rootScope.jobSeeker.BirthDate);
            $scope.photoName = $rootScope.jobSeeker.Photo;
            $scope.cvName = $rootScope.jobSeeker.CVLink;
        }));

    } else {
        $rootScope.jobSeeker = new mvJobSeeker();
        $rootScope.jobSeeker.Confirmed = false;
        $rootScope.jobSeeker.Deleted = false;
        $scope.updateMode = false;
        $scope.addMode = true;
        $scope.addEnabled = true;
    }
    
    $scope.update = function () {
        if ( $scope.jobSeekerForm.$valid) {
            mvJobSeekerRepo.updateCurrentJobSeeker( $rootScope.jobSeeker).then(function () {
                //$scope.IsMobileInserted = true;
                mvNotifier.notify('JobSeeker has been updated!');
            }, function (reason) {
                mvNotifier.error(reason);
            });
        } 
    };
    
    $scope.add = function () {
        if ($scope.jobSeekerForm.$valid && $scope.addEnabled) {
            $scope.addEnabled = false;
            mvJobSeekerRepo.createJobSeeker( $rootScope.jobSeeker).then(function () {
                
                mvNotifier.notify('New Contact Added!'); 
                //$scope.IsMobileInserted = true;    
                //var u = $rootScope.AddressId;
                $scope.addEnabled = false;
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
    };
     
});