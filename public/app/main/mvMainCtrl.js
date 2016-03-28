angular.module('app').controller('mvMainCtrl', function ($scope, mvCourse, mvIdentity,$translate) {
    $scope.identity = mvIdentity;
    $scope.courses = mvCourse.query();

});