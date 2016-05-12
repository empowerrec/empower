angular.module('app').factory('mvLanguageLevel', function ($resource) {
    var LanguageLevelResource = $resource('/api/languageLevels/:_id', {_id: '@id'}, {
        update: {method: 'PUT', isArray: false}
    });

    return LanguageLevelResource;
});