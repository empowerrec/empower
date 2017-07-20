angular.module('app').factory('mvSubUserInvitationDetailRepo', function ($http, $q, mvSubUserInvitationDetail,mvIdentity) {
    return {

        createSubUserInvitationDetail: function (newSubUserInvitationDetailData) {

            var newSubUserInvitationDetail = new mvSubUserInvitationDetail(newSubUserInvitationDetailData);
            newSubUserInvitationDetail.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving SubUserInvitationDetail");
            newSubUserInvitationDetail.$save().then(function (res) {
                console.log("SubUserInvitationDetail Saved");
                dfd.resolve(res);
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        updateCurrentSubUserInvitationDetail: function (newSubUserInvitationDetailData) {
            newSubUserInvitationDetailData.ModifiedBy = mvIdentity.currentUser;

            var dfd = $q.defer();

            var clone = angular.copy(newSubUserInvitationDetailData);
            angular.extend(clone,newSubUserInvitationDetailData);
            clone.$update({currentUser:mvIdentity.currentUser}).then(function () {

                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    };
});