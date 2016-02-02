angular.module('app').controller('mvUserListCtrl', function ($scope, mvUser) {
    $scope.users = mvUser.query();
    console.log(mvUser.query());
    console.log($scope.users);
});