angular.module('app').factory('mvCachedLanguageLevel', function (mvLanguageLevel) {
    var languageLevelsList;
    return {
        query: function () {
            if (!languageLevelsList) {
                languageLevelsList = mvLanguageLevel.query();
            }
            return languageLevelsList;
        }
    };
});