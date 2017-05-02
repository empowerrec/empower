angular.module('app').factory('mvCachedFeature', function (mvCourse) {
    var FeatureList;
    return {
        query: function () {
            if (!FeatureList) {
                FeatureList = mvFeature.query();
            }
            return FeatureList;
        }
    };
});