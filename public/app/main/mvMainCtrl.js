angular.module('app').controller('mvMainCtrl', function ($scope, mvCourse, mvIdentity, $location) {
    $scope.identity = mvIdentity;
    $scope.courses = mvCourse.query();
    
    $scope.search = function () {
        $location.path('/vacanciesByIndustries/573ec530965553c801430d67');
    };

});