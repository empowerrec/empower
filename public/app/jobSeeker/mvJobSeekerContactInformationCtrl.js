angular.module('app').controller('mvJobSeekerContactInformationCtrl', function ($scope, mvNotifier, mvJobSeekerRepo, mvJobSeeker, $routeParams, $rootScope) {
    
    var id = $routeParams.id;
    
    $scope.genders = [
        { value: 'Male', text: 'Male' },
        { value: 'Female', text: 'Female' }
    ];
    
    $scope.addEnabled = false;
    $scope.IsMobileInserted = false;
    // $rootScope.jobSeekers = mvJobSeeker.query();
    if (id) {
         $rootScope.jobSeeker = mvJobSeeker.get({ _id: id }, (function() {
            $scope.updateMode = true;
            $scope.addMode = false;
            $scope.IsMobileInserted = true;
             $rootScope.jobSeeker.MobileNo =  $rootScope.jobSeeker.MobileNo;
             $rootScope.jobSeeker.Email =  $rootScope.jobSeeker.Email;
           
                //if ( $rootScope.jobSeeker.MobileNo == null ||  $rootScope.jobSeeker.MobileNo == "" ||  $rootScope.jobSeeker.Email == null ||  $rootScope.jobSeeker.Email == "") {
                //    $scope.IsMobileInserted = false;
                //}
                
          
            // $rootScope.jobSeeker.BirthDate = new Date( $rootScope.jobSeeker.BirthDate);
            //if (! $rootScope.jobSeeker.Gender) {
            //     $rootScope.jobSeeker.Gender = $scope.genders[0].value;
            //}
        }));
    } else {
        //$http.get('/api/getJobSeekerWhereMobileNumberNotNull').then(function(res) {
            //if (res.data.length > 0) {
                //mvNotifier.notify('This link is expired please make another link');
        //$location.path('/forget');
        
         $rootScope.jobSeeker = new mvJobSeeker();
         $rootScope.jobSeeker.Deleted = false;
        $scope.updateMode = false;
        $scope.addMode = true;
        $scope.addEnabled = true;
        //$.ajax({
        //    url: "api/getJobSeekerWhereMobileNumberNotNull",
        //    dataType: 'json',
        //    async: false,
        //    success: function (data) {
        //        if (data) {
               
        //             $rootScope.jobSeeker = new mvJobSeeker();
        //            // $rootScope.jobSeeker.Gender = $scope.genders[0].value;
        //            $scope.IsMobileInserted = true;
        //            $scope.updateMode = false;
        //            $scope.addMode = true;
        //            $scope.addEnabled = false;
        //        } 
        //    },
        //    error: function (err) {
        //         $rootScope.jobSeeker = new mvJobSeeker();
        //        // $rootScope.jobSeeker.Gender = $scope.genders[0].value;
        //        $scope.IsMobileInserted = false;
        //        $scope.updateMode = false;
        //        $scope.addMode = true;
        //        $scope.addEnabled = true;
        //  }
        //});
               
            //}
        //});
    }
    // $rootScope.jobSeeker = mvJobSeeker.get({ MobileNumber: "" }, (function() {
        //    if (! $rootScope.jobSeekers.lenght > 0) {
              
        //    }

        //}));
    
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