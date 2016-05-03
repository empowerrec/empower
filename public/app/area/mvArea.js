angular.module('app').factory('mvArea', function ($resource) {
    var AreaResource = $resource('/api/areas/:_id', {_id: '@id'}, {
        update: {method: 'PUT', isArray: false}
    });

    return AreaResource;
});