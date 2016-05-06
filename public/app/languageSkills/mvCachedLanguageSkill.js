angular.module('app').factory('mvCachedLanguageSkill', function (mvLanguageSkill) {
    var languageSkillList;
    return {
        query: function () {
            if (!languageSkillList) {
                languageSkillList = mvLanguageSkill.query();
            }
            return languageSkillList;
        }
    };
});