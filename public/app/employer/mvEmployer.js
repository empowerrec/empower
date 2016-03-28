angular.module('app').factory('mvEmployer', function ($resource,mvIdentity) {
    var EmployerResource = $resource('/api/employers/:_id', {_id: '@id'},
        {update: {method: 'PUT', isArray: false}
    });

    return EmployerResource;
});