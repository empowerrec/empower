angular.module('app').controller('mvFrontSignupCtrl', function ($scope, $rootScope, $location, $q, mvUser, mvJobSeekerRepo, mvNotifier, mvAuth, mvIdentity, mvEmployer, mvEmployerRepo) {
    
    $scope.usertype = "J";
    
    $scope.signup = function () {
        if ($scope.frontSignupForm.$valid) {
            //form is valid
            
            var name;
            if ($scope.usertype == 'J') {
                name = $scope.firstname;
            }
            else {
                name = $scope.employername;
            }
            
            var newUserData = {
                UserName: $scope.email,
                Password: $scope.password,
                FirstName: name ,
                LastName: $scope.lastname,
                UserType: $scope.usertype,
                EmailPreference : $scope.EmailPreference
             
            };
            
            mvAuth.createUser(newUserData)
            .then(function () {
                if ($scope.usertype == 'E') {
                    var newEmployerData = {
                        EmployerName: [{ 'Lang': $rootScope.currentLang, 'Text': name }],
                        User: mvIdentity.currentUser,
                        CreatedBy: mvIdentity.currentUser
                    };
                    return mvEmployerRepo.createEmployerAfterCreatingUser(newEmployerData);
                } else if ($scope.usertype == 'J') {
                    var newJobSeekerData = {
                        User: mvIdentity.currentUser,
                        CreatedBy: mvIdentity.currentUser,
                        FirstName: name ,
                        Deleted:false,
                        LastName: $scope.lastname
                    };
                    return mvJobSeekerRepo.createJobSeekerAfterCreatingUser(newJobSeekerData);
                }
                return $q.null;
            })
            .then(function () {
                mvNotifier.notify('User account created!');
                var type = $scope.usertype;
                
                //clear form fields
                $scope.email = '';
                $scope.password = '';
                $scope.firstname = '';
                $scope.lastname = '';
                $scope.usertype = '';
                $scope.EmailPreference = false;
                if ($('#userregisterModal').length) {
                    $('#userregisterModal').modal('hide');
                }
                if (type == 'E') {
                    $location.path('/updateemployer/' + mvIdentity.currentEmployer._id);
                } else if (type == 'J') {
                    $location.path('/updateJobSeeker/PersonalInformation/' + mvIdentity.currentJobSeeker._id);
                }
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
    };
    
    $scope.facebookLogin = function () {
       
                    $location.path('/auth/facebook/');
             
    };
    
    $scope.googleLogin = function () {
        
        $location.path('/auth/google/');
             
    };
});