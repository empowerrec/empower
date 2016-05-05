angular.module('app').factory('mvCachedAddress', function (mvCourse) {
    var addressList;
    return {
        query: function () {
            if (!addressList) {
                addressList = mvAddress.query();
            }
            return addressList;
        }
    };
});