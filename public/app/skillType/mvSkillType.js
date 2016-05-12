angular.module('app').factory('mvSkillType', function ($resource) {
    var SkillTypeResource = $resource('/api/skillTypes/:_id', {_id: '@id'}, {
        update: {method: 'PUT', isArray: false}
    });

    return SkillTypeResource;
});