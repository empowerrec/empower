angular.module('app').factory('mvCachedPackageFeature', function (mvCourse) {
    var PackageFeatureList;
    return {
        query: function () {
            if (!PackageFeatureList) {
                PackageFeatureList = mvPackageFeature.query();
            }
            return PackageFeatureList;
        }
    };
});