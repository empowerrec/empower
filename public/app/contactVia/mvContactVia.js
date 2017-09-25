angular.module('app').factory('mvContactVia', function ($resource) {
    var contactViaResource = $resource('/api/contactVias/:_id', {_id: '@id'}, {
        update: {method: 'PUT', isArray: false}
    });

    return contactViaResource;
});