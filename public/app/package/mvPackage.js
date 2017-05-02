angular.module('app').factory('mvPackage', function ($resource,mvIdentity) {
    var PackageResource = $resource('/api/packages/:_id', {_id: '@id'},
        {update: {method: 'PUT', isArray: false}
    });
    return PackageResource;
});