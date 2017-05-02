angular.module('app').factory('mvUserFeature', function ($resource,mvIdentity) {
    var UserFeatureResource = $resource('/api/userFeatures/:_id', {_id: '@id'},
        {update: {method: 'PUT', isArray: false}
    });
    return UserFeatureResource;
});