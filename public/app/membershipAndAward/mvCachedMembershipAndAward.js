angular.module('app').factory('mvCachedMembershipAndAward', function (mvCourse) {
    var membershipAndAwardList;
    return {
        query: function () {
            if (!membershipAndAwardList) {
                membershipAndAwardList = mvMembershipAndAward.query();
            }
            return membershipAndAwardList;
        }
    };
});