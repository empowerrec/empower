angular.module('app').controller('mvProfileCtrl',
    function ($scope, mvIdentity, mvNotifier, mvAuth,
        mvUserFeature, queryBulider, mvUserPackage) {

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
    };
   
    $scope.getUserFeautures = function () {
        mvUserFeature.query({
            query: queryBulider.qb("User=='" + mvIdentity.currentUser._id + "'&&!Deleted"),
            currentPage: 1,
            pageSize: 99
        }, (function (res) {
            $scope.userFeatures = res[0].collection;
            $scope.allDataCount = res[0].allDataCount;
        }));
        };

        $scope.getUserPackage = function () {
            mvUserPackage.query({
                query: queryBulider.qb("User=='" + mvIdentity.currentUser._id + "'&&!Deleted"),
                currentPage: 1,
                pageSize: 99
            }, (function (res) {
                $scope.userPackages = res[0].collection;
                $scope.allDataCount = res[0].allDataCount;
            }));
        };
        $scope.getUserFeautures();
        $scope.getUserPackage();
});