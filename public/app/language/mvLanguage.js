angular.module('app').factory('mvLanguage', function ($resource) {
    var LanguageResource = $resource('/api/languages/:_id', {_id: '@id'}, {
        update: {method: 'PUT', isArray: false}
    });

    return LanguageResource;
});