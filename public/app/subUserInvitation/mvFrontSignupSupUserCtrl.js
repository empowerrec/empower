angular.module('app').controller('mvFrontSubUserSignupCtrl', function ($scope, $rootScope, $location, $q,
    mvUser, mvJobSeekerRepo, mvNotifier, mvAuth, mvIdentity, mvEmployer,
    mvEmployerRepo, mvSubUserInvitation, mvSubUserInvitationDetail, $routeParams, mvSubUserInvitationRepo, queryBulider, mvSubUserFeature, mvSubUserFeatureRepo) {
    var invitationId = $routeParams.id;

    if (invitationId) {
        $scope.invitation = mvSubUserInvitation.get({ _id: invitationId }, (function () {

            $scope.usertype = "S";
            $scope.email = $scope.invitation.Email;
            //$scope.email = "nnnnnnnnnn@gmail.com"
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

            mvSubUserInvitationDetail.query({
                query: queryBulider.qb("SubUserInvitation=='" + $scope.invitation._id + "'&&!Deleted"),
                //currentPage: $scope.paging.currentPage,
                //pageSize: $scope.paging.pageSize
            }, (function (ress) {
                $scope.invitationFeatures = ress[0].collection;
                $scope.allDataCount = ress[0].allDataCount;
                //newUserData._id; subUserFeatures
                mvAuth.createUser(newUserData)
                    .then(function (newUser) {
                        mvNotifier.notify('User account created!');

                        //newUserData._id;            
                        //$scope.invitation._id
                        //pass features to sub user fetures
                        for (infoIndexx = 0; infoIndexx < $scope.invitationFeatures.length; infoIndexx++) {

                            //var newJobSeekerData = {
                            //    User: mvIdentity.currentUser,
                            //    CreatedBy: mvIdentity.currentUser,
                            //    FirstName: name,
                            //    Deleted: false,
                            //    LastName: $scope.lastname
                            //};

                            $scope.mvSubUserFeature = new mvSubUserFeature();
                            $scope.mvSubUserFeature.UsedFromPoints = 0;
                            $scope.mvSubUserFeature.User = newUser._id;
                            $scope.mvSubUserFeature.Points = $scope.invitationFeatures[infoIndexx].Points
                            $scope.mvSubUserFeature.Feature = $scope.invitationFeatures[infoIndexx].Feature
                            $scope.mvSubUserFeature.Deleted = false;
                            mvSubUserFeatureRepo.createSubUserFeature($scope.mvSubUserFeature).then(function (res) {

                            }, function (reason) {
                                mvNotifier.error(reason);
                            });

                        }

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

            }));

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
                //$scope.getData();
            }, function (reason) {
                mvNotifier.error(reason);
            });
        }));
    };


});