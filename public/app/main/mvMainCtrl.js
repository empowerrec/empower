angular.module('app').controller('mvMainCtrl', function ($scope, mvCourse, mvIdentity) {
    $scope.identity = mvIdentity;
    $scope.courses = mvCourse.query();


});