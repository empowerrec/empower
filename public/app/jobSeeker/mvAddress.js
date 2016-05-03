angular.module('app').factory('mvAddress', function ($resource) {
    var addressResource = $resource('/api/addresses/:_id', {_id: '@id'}, {
        update: {method: 'PUT', isArray: false}
    });

    return addressResource;
}); 