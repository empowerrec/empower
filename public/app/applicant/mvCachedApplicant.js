angular.module('app').factory('mvCachedApplicant', function (mvApplicant) {
    var applicantList;
    return {
        query: function () {
            if (!applicantList) {
                applicantList = mvApplicant.query();
            }
            return applicantList;
        }
    };
});