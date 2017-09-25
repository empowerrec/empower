angular.module('app').controller('mvMembershipAndAwardDetailCtrl', function ($scope, mvMembershipAndAward, $routeParams) {
    $scope.membershipAndAward = mvMembershipAndAward.get({_id: $routeParams.id});
});