angular.module('app').factory('mvNationality', function ($resource) {
    var nationalityResource = $resource('/api/nationalities/:_id', {_id: '@id'}, {
        update: {method: 'PUT', isArray: false}
    });

    return nationalityResource;
}); 