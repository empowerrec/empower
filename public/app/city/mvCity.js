angular.module('app').factory('mvCity', function ($resource) {
    var CityResource = $resource('/api/cities/:_id', {_id: '@id'}, {
        update: {method: 'PUT', isArray: false}
    });

    return CityResource;
});