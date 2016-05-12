angular.module('app').factory('mvCachedLanguage', function (mvLanguage) {
    var languageList;
    return {
        query: function () {
            if (!languageList) {
                languageList = mvLanguage.query();
            }
            return languageList;
        }
    };
});