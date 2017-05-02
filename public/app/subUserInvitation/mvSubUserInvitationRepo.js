angular.module('app').factory('mvSubUserInvitationRepo', function ($http, $q, mvSubUserInvitation,mvIdentity) {
    return {

        createSubUserInvitation: function (newSubUserInvitationData) {

            var newSubUserInvitation = new mvSubUserInvitation(newSubUserInvitationData);
            newSubUserInvitation.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving SubUserInvitation");
            newSubUserInvitation.$save().then(function () {
                console.log("SubUserInvitation Saved");
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        updateCurrentSubUserInvitation: function (newSubUserInvitationData) {
            newSubUserInvitationData.ModifiedBy = mvIdentity.currentUser;

            var dfd = $q.defer();

            var clone = angular.copy(newSubUserInvitationData);
            angular.extend(clone,newSubUserInvitationData);
            clone.$update({currentUser:mvIdentity.currentUser}).then(function () {

                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    };
});