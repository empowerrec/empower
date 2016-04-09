angular.module('app').factory('mvCachedVacancy', function (mvCourse) {
    var vacancyList;
    return {
        query: function () {
            if (!vacancyList) {
                vacancyList = mvVacancy.query();
            }
            return vacancyList;
        }
    };
});