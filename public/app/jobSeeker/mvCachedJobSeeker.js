angular.module('app').factory('mvCachedJobSeeker', function () {
    var jobSeekerList;
    return {
        query: function () {
            if (!jobSeekerList) {
                jobSeekerList = mvJobSeeker.query();
            }
            return jobSeekerList;
        }
    };
});