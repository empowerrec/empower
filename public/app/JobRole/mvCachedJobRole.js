angular.module('app').factory('mvCachedJobRole', function (mvCourse) {
    var jobRoleList;
    return {
        query: function () {
            if (!jobRoleList) {
                jobRoleList = mvJobRole.query();
            }
            return jobRoleList;
        }
    };
});