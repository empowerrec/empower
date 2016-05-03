angular.module('app').factory('mvMaritalStatus', function ($resource) {
    var maritalStatusResource = $resource('/api/maritalStatuses/:_id', {_id: '@id'}, {
        update: {method: 'PUT', isArray: false}
    });

    return maritalStatusResource;
});