angular.module('app').controller('mvCourseListCtrl', function ($scope, mvCourse) {
    $scope.courses = mvCourse.query();

    $scope.sortOptions = [{value: 'Title', text: 'Sort by Title'},
        {value: 'Published', text: 'Sort by Publish Date'}];
    $scope.sortOrder = $scope.sortOptions[0].value;
});