angular.module('app').controller('mvSubUserInvitationDetailCtrl', function ($scope, mvSubUserInvitation, $routeParams) {
    $scope.subUserInvitation = mvSubUserInvitation.get({_id: $routeParams.id});
});