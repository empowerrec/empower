angular.module('app').controller('mvForgetPasswordCtrl', function ($scope, $http, $location, mvIdentity, mvNotifier) {

    $scope.disableFlag = false;
    $scope.resetPassword = function () {
        if ($scope.forgetPasswordForm.$valid) {
            $scope.disableFlag = true;
            $http.post('/forget', { email: $scope.email }).then(function() {
                mvNotifier.notify('An e-mail has been sent to ' + $scope.email + ' with further instructions.');                
                $location.path('/');
            });
        }
    };
});