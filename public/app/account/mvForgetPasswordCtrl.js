angular.module('app').controller('mvForgetPasswordCtrl', function ($scope, mvIdentity, mvNotifier, mvAuth) {
    
    $scope.resetPassword = function () {
        if ($scope.forgetPasswordForm.$valid) {            
            mvAuth.resetUserPassword($scope.email).then(function () {
                mvNotifier.notify('An e-mail has been sent to ' + $scope.email + ' with further instructions.');
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
    };
});