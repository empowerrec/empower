angular.module('app').factory('mvCachedFaculty', function (mvFaculty) {
    var facultyList;
    return {
        query: function () {
            if (!facultyList) {
                facultyList = mvFaculty.query();
            }
            return facultyList;
        }
    };
});