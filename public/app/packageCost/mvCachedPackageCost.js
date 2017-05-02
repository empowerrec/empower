angular.module('app').factory('mvCachedPackageCost', function (mvCourse) {
    var PackageCostList;
    return {
        query: function () {
            if (!PackageCostList) {
                PackageCostList = mvPackageCost.query();
            }
            return PackageCostList;
        }
    };
});