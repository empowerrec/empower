angular.module('app').factory('mvPackageCost', function ($resource,mvIdentity) {
    var PackageCostResource = $resource('/api/packageCosts/:_id', {_id: '@id'},
        {update: {method: 'PUT', isArray: false}
    });
    return PackageCostResource;
});