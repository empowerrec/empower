angular.module('app').factory('mvCachedUserFeature', function (mvCourse) {
    var UserFeatureList;
    return {
        query: function () {
            if (!UserFeatureList) {
                UserFeatureList = mvUserFeature.query();
            }
            return UserFeatureList;
        }
    };
});