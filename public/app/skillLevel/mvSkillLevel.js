angular.module('app').factory('mvSkillLevel', function ($resource) {
    var SkillLevelResource = $resource('/api/skillLevels/:_id', {_id: '@id'}, {
        update: {method: 'PUT', isArray: false}
    });

    return SkillLevelResource;
});