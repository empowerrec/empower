angular.module('app').factory('mvCachedVacancy', function (mvVacancy) {
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