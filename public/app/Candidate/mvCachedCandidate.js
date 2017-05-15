angular.module('app').factory('mvCachedCandidate', function (mvCourse) {
    var CandidateList;
    return {
        query: function () {
            if (!CandidateList) {
                CandidateList = mvCandidate.query();
            }
            return CandidateList;
        }
    };
});