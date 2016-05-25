angular.module('app').factory('mvCachedUnivirsty', function (mvUnivirsty) {
    var univirstyList;
    return {
        query: function () {
            if (!univirstyList) {
                univirstyList = mvUnivirsty.query();
            }
            return univirstyList;
        }
    };
});