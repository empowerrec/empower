angular.module('app').controller('mvApplicantDetailCtrl', function ($scope, mvApplicant, $routeParams) {
    $scope.applicant = mvApplicant.get({_id: $routeParams.id});
});