angular.module('app').controller('mvResetPasswordCtrl', function ($scope, $http, $location, mvIdentity, mvNotifier) {
    
    $scope.resetPassword = function () {
        if ($scope.resetPasswordForm.$valid) {
            $http.post('/reset', { email: $scope.email }).then(function() {
                mvNotifier.notify('An e-mail has been sent to ' + $scope.email + ' with further instructions.');
                $location.path('/');
            });
        }
    };
});