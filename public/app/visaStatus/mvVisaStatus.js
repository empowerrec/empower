angular.module('app').factory('mvVisaStatus', function ($resource) {
    var visaStatusResource = $resource('/api/visaStatuses/:_id', {_id: '@id'}, {
        update: {method: 'PUT', isArray: false}
    });

    return visaStatusResource;
});