angular.module('app').controller('mvProfileCtrl', function ($scope, mvIdentity, mvNotifier, mvAuth) {

    $scope.email = mvIdentity.currentUser.UserName;
    $scope.firstname = mvIdentity.currentUser.FirstName;
    $scope.lastname = mvIdentity.currentUser.LastName;

    $scope.update = function () {
        var newUserData = {
            UserName: $scope.email,
            FirstName: $scope.firstname,
            LastName: $scope.lastname
        };

        if($scope.password && $scope.password.length > 0 ){
            newUserData.Password = $scope.password;
        }

        mvAuth.updateCurrentUser(newUserData).then(function () {
            mvNotifier.notify('Your user account has been updated!');
        }, function (reason) {
            mvNotifier.error(reason);
        });
    }
});