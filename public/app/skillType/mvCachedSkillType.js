angular.module('app').factory('mvCachedSkillType', function (mvSkillType) {
    var skillTypeList;
    return {
        query: function () {
            if (!skillTypeList) {
                skillTypeList = mvSkillType.query();
            }
            return skillTypeList;
        }
    };
});