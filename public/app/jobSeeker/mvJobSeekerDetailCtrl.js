angular.module('app').controller('mvJobSeekerDetailCtrl', function ($scope, mvJobSeeker, $routeParams) {
    $scope.jobSeeker = mvJobSeeker.get({_id: $routeParams.id});
});