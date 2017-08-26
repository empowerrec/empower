angular.module('app').factory('mvCachedSubUserFeature', function (mvCourse) {
    var SubUserFeatureList;
    return {
        query: function () {
            if (!SubUserFeatureList) {
                SubUserFeatureList = mvSubUserFeature.query();
            }
            return SubUserFeatureList;
        }
    };
});