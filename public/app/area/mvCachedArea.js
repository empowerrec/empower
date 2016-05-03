angular.module('app').factory('mvCachedArea', function (mvArea) {
    var areaList;
    return {
        query: function () {
            if (!areaList) {
                areaList = mvArea.query();
            }
            return areaList;
        }
    };
});