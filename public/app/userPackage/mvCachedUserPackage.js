angular.module('app').factory('mvCachedUserPackage', function (mvCourse) {
    var UserPackageList;
    return {
        query: function () {
            if (!UserPackageList) {
                UserPackageList = mvUserPackage.query();
            }
            return UserPackageList;
        }
    };
});