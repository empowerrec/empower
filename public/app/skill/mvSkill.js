angular.module('app').factory('mvSkill', function ($resource) {
    var SkillResource = $resource('/api/skills/:_id', {_id: '@id'},
        {update: {method: 'PUT', isArray: false}
    });
    return SkillResource;
});