angular.module('app').controller('mvFacultyDetailCtrl', function ($scope, mvFaculty, $routeParams) {
    $scope.faculty = mvFaculty.get({_id: $routeParams.id});
});