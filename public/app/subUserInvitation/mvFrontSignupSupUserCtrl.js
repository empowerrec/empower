angular.module('app').controller('mvFrontSubUserSignupCtrl', function ($scope, $rootScope, $location, $q,
    mvUser, mvJobSeekerRepo, mvNotifier, mvAuth, mvIdentity, mvEmployer, mvEmployerRepo) {
    
    $scope.usertype = "S";
    $scope.email = 'sar_foly@yahoo.com';
    $scope.signup = function () {
        if ($scope.frontSignupForm.$valid) {
            var newUserData = {
                UserName: $scope.email,
                Password: $scope.password,
                FirstName: $scope.firstname,
                LastName: $scope.lastname,
                UserType: $scope.usertype
            };
            
            mvAuth.createUser(newUserData)
            .then(function () {
            mvNotifier.notify('User account created!');
            var type = $scope.usertype;
                $scope.email = '';
                $scope.password = '';
                $scope.firstname = '';
                $scope.lastname = '';
                $scope.usertype = '';
                if ($('#userregisterModal').length) {
                    $('#userregisterModal').modal('hide');
                }
               
                $location.path('/profile');
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