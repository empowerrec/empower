angular.module('app').factory('mvCachedPackage', function (mvCourse) {
    var PackageList;
    return {
        query: function () {
            if (!PackageList) {
                PackageList = mvPackage.query();
            }
            return PackageList;
        }
    };
});