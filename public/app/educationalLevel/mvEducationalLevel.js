angular.module('app').factory('mvEducationalLevel', function ($resource) {
    var educationalLevelResource = $resource('/api/educationalLevels/:_id', {_id: '@id'}, {
        update: {method: 'PUT', isArray: false}
    });

    return educationalLevelResource;
}); 