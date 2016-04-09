angular.module('app').factory('mvCachedIndustry', function (mvCourse) {
    var industryList;
    return {
        query: function () {
            if (!industryList) {
                industryList = mvIndustry.query();
            }
            return industryList;
        }
    };
});