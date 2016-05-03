angular.module('app').factory('mvCachedCity', function (mvCity) {
    var cityList;
    return {
        query: function () {
            if (!cityList) {
                cityList = mvCity.query();
            }
            return cityList;
        }
    };
});