angular.module('app').factory('mvCachedSkillLevel', function (mvSkillLevel) {
    var skillLevelList;
    return {
        query: function () {
            if (!skillLevelList) {
                skillLevelList = mvSkillLevel.query();
            }
            return skillLevelList;
        }
    };
});