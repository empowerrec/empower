angular.module('app').controller('mvSidebarCtrl',
    function ($scope, $http, $location, mvIdentity) {
        $scope.identity = mvIdentity;
    });