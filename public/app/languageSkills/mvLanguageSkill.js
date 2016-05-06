angular.module('app').factory('mvLanguageSkill', function ($resource) {
    var languageSkillResource = $resource('/api/languageSkills/:_id', { _id: '@id' }, {
        update: { method: 'PUT', isArray: false }
    });
    return languageSkillResource;
});