angular.module('app').factory('mvCarLicenceType', function ($resource) {
    var carLicenceTypeResource = $resource('/api/carLicenceTypes/:_id', {_id: '@id'}, {
        update: {method: 'PUT', isArray: false}
    });

    return carLicenceTypeResource;
});