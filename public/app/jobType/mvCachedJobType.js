angular.module('app').factory('mvCachedJobType', function (mvCourse) {
    var jobTypeList;
    return {
        query: function () {
            if (!jobTypeList) {
                jobTypeList = mvJobType.query();
            }
            return jobTypeList;
        }
    };
});