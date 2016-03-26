angular.module('app').factory('mvCachedEmployer', function (mvCourse) {
    var employerList;
    return {
        query: function () {
            if (!employerList) {
                employerList = mvEmployer.query();
            }
            return employerList;
        }
    };
});