angular.module('app').factory('mvSubUserFeature', function ($resource, mvIdentity) {
    var SubUserFeatureResource = $resource('/api/subUserFeatures/:_id', { _id: '@id' },
        {
            update: { method: 'PUT', isArray: false }
        });
    return SubUserFeatureResource;
});