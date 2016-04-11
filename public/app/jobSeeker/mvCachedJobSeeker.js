angular.module('app').factory('mvCachedJobSeeker', function (mvJobSeeker) {
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