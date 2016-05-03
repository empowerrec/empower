angular.module('app').controller('mvResetPasswordCtrl', function ($scope, $http, $location, $routeParams, mvUser, mvIdentity, mvNotifier) {
    
    $scope.disableFlag = false;

    $http.get('/reset/'+ $routeParams.token).then(function (res) {
        if (res.data.reason) {
            mvNotifier.notify('This link is expired please make another link');
            $location.path('/forget');
        }
    });

    $scope.resetPassword = function () {
        if ($scope.resetPasswordForm.$valid) {
            $scope.disableFlag = true;
            $http.post('/reset', {token: $routeParams.token, password: $scope.password }).then(function(res) {
                if (res.data.error) {
                    mvNotifier.notify(res.data.error);
                    $location.path('/forget');
                } else {
                    if (res.data.success) {
                        var user = new mvUser();
                        angular.extend(user, res.data.user);
                        mvIdentity.currentUser = user;                        
                    }
                    mvNotifier.notify('Your password has been changed successfully please sign in');
                    $location.path('/');
                }                
            });
        }
    };
});