angular.module('app').factory('mvEducationType', function ($resource) {
    var educationTypeResource = $resource('/api/educationTypes/:_id', {_id: '@id'}, {
        update: {method: 'PUT', isArray: false}
    });

    return educationTypeResource;
});