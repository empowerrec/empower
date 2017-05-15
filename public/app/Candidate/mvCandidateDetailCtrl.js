angular.module('app').controller('mvCandidateDetailCtrl', function ($scope, mvCandidate, $routeParams) {
    $scope.Candidate = mvCandidate.get({_id: $routeParams.pfid});
});