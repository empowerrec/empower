angular.module('app').factory('mvUserPackage', function ($resource,mvIdentity) {
    var UserPackageResource = $resource('/api/userPackages/:_id', {_id: '@id'},
        {update: {method: 'PUT', isArray: false}
    });
    return UserPackageResource;
});