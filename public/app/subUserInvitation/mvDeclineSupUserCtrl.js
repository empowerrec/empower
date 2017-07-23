angular.module('app').controller('mvDeclineSupUserCtrl', function ($scope, $rootScope, $location, $q,
    mvUser, mvJobSeekerRepo, mvNotifier, mvAuth, mvIdentity, mvEmployer,
    mvEmployerRepo, mvSubUserInvitation, $routeParams, mvSubUserInvitationRepo) {
    var invitationId = $routeParams.id;

    if (invitationId) {
       $scope.invitation = mvSubUserInvitation.get({ _id: invitationId }, (function () {
            

           $scope.UpdateStatus($scope.invitation, "Reject");



        }));
    };

   

    $scope.UpdateStatus = function (subUserInvitation, type) {
        var ed = mvSubUserInvitation.get({ _id: subUserInvitation._id }, (function () {
            if (type == 'Cancel')
                ed.Status = "C";
            else if (type == 'Accept')
                ed.Status = "A";
            else if (type == 'Reject')
                ed.Status = "R";

            else
                ed.Status = "O";
            mvSubUserInvitationRepo.updateCurrentSubUserInvitation(ed).then(function () {
                $scope.invitation
                mvNotifier.notify('Status has been updated!');
                $scope.invitation = mvSubUserInvitation.get({ _id: invitationId }, (function () {

                }));
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }));
    };
       
       
});