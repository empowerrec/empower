angular.module('app').factory('mvArea', function ($resource) {
    var areaResource = $resource('/api/areas/:_id', {_id: '@id'}, {
        update: {method: 'PUT', isArray: false}
    });

    return areaResource;
});