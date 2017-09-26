angular.module('app').factory('mvCachedTravelPreference', function (mvCourse) {
    var TravelPreferenceList;
    return {
        query: function () {
            if (!TravelPreferenceList) {
                TravelPreferenceList = mvTravelPreference.query();
            }
            return TravelPreferenceList;
        }
    };
});