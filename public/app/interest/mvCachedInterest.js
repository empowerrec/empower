angular.module('app').factory('mvCachedInterest', function (mvCourse) {
    var interestList;
    return {
        query: function () {
            if (!interestList) {
                interestList = mvInterest.query();
            }
            return interestList;
        }
    };
});