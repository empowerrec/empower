angular.module('app').controller('mvJobSeekerCVCtrl'
    , function ($scope, mvNotifier, mvJobSeekerRepo, mvJobSeeker, mvGender, $routeParams, $rootScope, $q, Upload) {
    
    var id = $routeParams.id;
    $scope.addEnabled = false;
    
    if (id) {
        $rootScope.jobSeeker = mvJobSeeker.get({ _id: id }, (function () {
            $scope.updateMode = true;
            $scope.addMode = false;
            
            $rootScope.jobSeeker.BirthDate = new Date($rootScope.jobSeeker.BirthDate);
            
            $scope.cvName = $rootScope.jobSeeker.CVFile;
        }));

        

       

    } else {
        $rootScope.jobSeeker = new mvJobSeeker();
        
        $rootScope.jobSeeker.Confirmed = false;
        $rootScope.jobSeeker.Deleted = false;
        $scope.updateMode = false;
        $scope.addMode = true;
        $scope.addEnabled = true;
        
    }

    $scope.upload = function (file , type) {
       
            var dfd = $q.defer();
          
                Upload.upload({
                    url: '/upload', //webAPI exposed to upload the file
                    data: { file: file } //pass file as data, should be user ng-model
                }).then(function (resp) { //upload function returns a promise
                    if (resp.data.error_code === 0) { //validate success
                        console.log('Success ' + resp.config.data.file.name + ' uploaded. Response: ');
                        if (type == "P")
                            $scope.photoName = resp.data.file_name;
                        else if (type == "C")
                            $scope.cvName = resp.data.file_name;
                        dfd.resolve();
                    } else {
                        mvNotifier.error('an error occured at upload photo');
                        dfd.reject('an error occured at upload photo');

                    }
                }, function (resp) { //catch error
                    console.log('Error status: ' + resp.status);
                }, function (evt) {
                    console.log(evt);
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                    $scope.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
                });
            
            return dfd.promise;
        

    };
    $scope.update = function () {
        if ($scope.jobSeekerForm.$valid) {
            
                $scope.upload($scope.cvFile , "C").then(function () {
                    if ($rootScope.jobSeeker.CVFile != $scope.cvName) {
                        $rootScope.jobSeeker.CVFile = $scope.cvName;
                    }
                    mvJobSeekerRepo.updateCurrentJobSeeker($rootScope.jobSeeker).then(function () {
                        mvNotifier.notify('JobSeeker has been updated!');
                    }, function (reason) {
                        mvNotifier.error(reason);
                    });
                });
           

    };
    };
    
    $scope.add = function () {
        if ($rootScope.jobSeekerForm.$valid && $scope.addEnabled) {
            mvJobSeekerRepo.createJobSeeker($rootScope.jobSeeker).then(function () {
                mvNotifier.notify('New JobSeeker Added!');
                $scope.addEnabled = false;
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
    };
     
});