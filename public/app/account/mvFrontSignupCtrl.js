angular.module('app').controller('mvFrontSignupCtrl', function ($scope, $location, mvUser, mvNotifier, mvAuth) {

    $scope.signup = function () {
        var newUserData = {
            UserName: $scope.email,
            Password: $scope.password,
            FirstName: $scope.firstname,
            LastName: $scope.lastname
        };

        mvAuth.createUser(newUserData).then(function () {
            mvNotifier.notify('User account created!');
            $location.path('/');
        }, function (reason) {
            mvNotifier.error(reason);
        });
    };
});