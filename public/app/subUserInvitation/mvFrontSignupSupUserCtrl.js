angular.module('app').controller('mvFrontSubUserSignupCtrl', function ($scope, $rootScope, $location, $q,
    mvUser, mvJobSeekerRepo, mvNotifier, mvAuth, mvIdentity, mvEmployer,
    mvEmployerRepo, mvSubUserInvitation, $routeParams, mvSubUserInvitationRepo) {
    var invitationId = $routeParams.id;

    if (invitationId) {
       $scope.invitation = mvSubUserInvitation.get({ _id: invitationId }, (function () {
            

            $scope.usertype = "S";
            $scope.email = $scope.invitation.Email;
            $scope.employer = $scope.invitation.Employer;



        }));
    };

    $scope.signup = function () {
        if ($scope.frontSignupForm.$valid) {
            var newUserData = {
                UserName: $scope.email,
                Password: $scope.password,
                FirstName: $scope.firstname,
                LastName: $scope.lastname,
                UserType: $scope.usertype,
                Employer: $scope.employer
            };
            
            mvAuth.createUser(newUserData)
            .then(function () {
            mvNotifier.notify('User account created!');
            var type = $scope.usertype;
                $scope.email = '';
                $scope.password = '';
                $scope.firstname = '';
                $scope.lastname = '';
                $scope.usertype = '';
                if ($('#userregisterModal').length) {
                    $('#userregisterModal').modal('hide');
                }
                $scope.UpdateStatus($scope.invitation, "Accept");
                $location.path('/profile');
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }
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
                mvNotifier.notify('Status has been updated!');
                $scope.getData();
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }));
    };
       
       
});