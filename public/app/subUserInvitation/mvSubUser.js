angular.module('app').factory('mvSubUser', function ($resource, mvIdentity) {
    var SubUserResource = $resource('/api/subUsers/:_id', { _id: '@id' },
        {
            update: { method: 'PUT', isArray: false }
        });
    return SubUserResource;
});
