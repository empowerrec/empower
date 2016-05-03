angular.module('app').factory('mvCompanySize', function ($resource) {
    var CompanySizeResource = $resource('/api/companySizes/:_id', {_id: '@id'}, {
        update: {method: 'PUT', isArray: false}
    });

    return CompanySizeResource;
});