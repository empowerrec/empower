angular.module('app').factory('mvFeature', function ($resource,mvIdentity) {
    var FeatureResource = $resource('/api/features/:_id', {_id: '@id'},
        {update: {method: 'PUT', isArray: false}
    });
    return FeatureResource;
});