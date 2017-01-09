angular.module('app').controller('mvFrontLoginCtrl',
    function ($scope, $http, $location, mvIdentity, mvNotifier, mvAuth) {
    $scope.identity = mvIdentity;
    
    $scope.signin = function (username, password, rememberme) {
        if ($scope.frontLoginForm.$valid) {            
            mvAuth.authenticatedUser(username, password, rememberme).then(function (success) {
                if (success) {
                   
                    $scope.username = '';
                    $scope.password = '';
                    mvNotifier.notify('You have successfully signed in');
                    if ($('#userloginModal').length) {
                        $('#userloginModal').modal('hide');
                    }
                    
                } else {
                    mvNotifier.error('Username/Password combination incorrect');
                }
            });
        }
    };
    
    $scope.signout = function () {
        mvAuth.logoutUser().then(function () {
            $scope.username = '';
            $scope.password = '';
            mvNotifier.notify('You have successfully signed out');
            $location.path('/');
        });
    };


});