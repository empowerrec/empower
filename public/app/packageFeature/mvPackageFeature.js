angular.module('app').factory('mvPackageFeature', function ($resource,mvIdentity) {
    var PackageFeatureResource = $resource('/api/packageFeatures/:_id', {_id: '@id'},
        {update: {method: 'PUT', isArray: false}
    });
    return PackageFeatureResource;
});