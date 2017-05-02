angular.module('app').factory('mvCachedSubUserInvitation', function (mvCourse) {
    var subUserInvitationList;
    return {
        query: function () {
            if (!subUserInvitationList) {
                subUserInvitationList = mvSubUserInvitation.query();
            }
            return subUserInvitationList;
        }
    };
});