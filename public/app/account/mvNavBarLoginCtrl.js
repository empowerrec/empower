angular.module('app').controller('mvNavBarLoginCtrl',
    function ($scope, $http, $location, mvIdentity, mvNotifier, mvAuth,$translate) {
        $scope.identity = mvIdentity;

        $scope.signin = function (username, password) {
            mvAuth.authenticatedUser(username, password).then(function (success) {
                if (success) {
                    mvNotifier.notify('You have successfully signed in');
                } else {
                    mvNotifier.error('Username/Password combination incorrect');
                }
            });
        };

        $scope.signout = function () {
            mvAuth.logoutUser().then(function () {
                $scope.username = '';
                $scope.password = '';
                mvNotifier.notify('You have successfully signed out');
                $location.path('/');
            });
        };

        $scope.changeLanguage = function(lang){
            $translate.use(lang);
        };
    });