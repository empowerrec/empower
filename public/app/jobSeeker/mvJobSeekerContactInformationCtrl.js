angular.module('app').controller('mvJobSeekerContactInformationCtrl', function ($scope, mvNotifier, mvJobSeekerRepo, mvJobSeeker, $routeParams, $rootScope) {
    
    var id = $routeParams.id;
    
    $scope.genders = [
        { value: 'Male', text: 'Male' },
        { value: 'Female', text: 'Female' }
    ];
    
    $scope.addEnabled = false;
    $scope.IsMobileInserted = false;
    //$scope.jobSeekers = mvJobSeeker.query();
    if (id) {
        $scope.jobSeeker = mvJobSeeker.get({ _id: id }, (function() {
            $scope.updateMode = true;
            $scope.addMode = false;
            $scope.IsMobileInserted = true;
            $scope.jobSeeker.MobileNo = $scope.jobSeeker.MobileNo;
            $scope.jobSeeker.Email = $scope.jobSeeker.Email;
           
                //if ($scope.jobSeeker.MobileNo == null || $scope.jobSeeker.MobileNo == "" || $scope.jobSeeker.Email == null || $scope.jobSeeker.Email == "") {
                //    $scope.IsMobileInserted = false;
                //}
                
          
            //$scope.jobSeeker.BirthDate = new Date($scope.jobSeeker.BirthDate);
            //if (!$scope.jobSeeker.Gender) {
            //    $scope.jobSeeker.Gender = $scope.genders[0].value;
            //}
        }));
    } else {
        //$http.get('/api/getJobSeekerWhereMobileNumberNotNull').then(function(res) {
            //if (res.data.length > 0) {
                //mvNotifier.notify('This link is expired please make another link');
        //$location.path('/forget');
        
        $scope.jobSeeker = new mvJobSeeker();
        $scope.jobSeeker.Deleted = false;
        $scope.updateMode = false;
        $scope.addMode = true;
        $scope.addEnabled = true;
        //$.ajax({
        //    url: "api/getJobSeekerWhereMobileNumberNotNull",
        //    dataType: 'json',
        //    async: false,
        //    success: function (data) {
        //        if (data) {
               
        //            $scope.jobSeeker = new mvJobSeeker();
        //            //$scope.jobSeeker.Gender = $scope.genders[0].value;
        //            $scope.IsMobileInserted = true;
        //            $scope.updateMode = false;
        //            $scope.addMode = true;
        //            $scope.addEnabled = false;
        //        } 
        //    },
        //    error: function (err) {
        //        $scope.jobSeeker = new mvJobSeeker();
        //        //$scope.jobSeeker.Gender = $scope.genders[0].value;
        //        $scope.IsMobileInserted = false;
        //        $scope.updateMode = false;
        //        $scope.addMode = true;
        //        $scope.addEnabled = true;
        //  }
        //});
               
            //}
        //});
    }
    //$scope.jobSeeker = mvJobSeeker.get({ MobileNumber: "" }, (function() {
        //    if (!$scope.jobSeekers.lenght > 0) {
              
        //    }

        //}));
    
    $scope.update = function () {
        if ($scope.jobSeekerForm.$valid) {
            mvJobSeekerRepo.updateCurrentJobSeeker($scope.jobSeeker).then(function () {
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
            mvJobSeekerRepo.createJobSeeker($scope.jobSeeker).then(function () {
                
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