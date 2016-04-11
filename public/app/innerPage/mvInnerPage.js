angular.module('app').factory('mvInnerPage', function ($resource,mvIdentity) {
    var InnerPageResource = $resource('/api/innerPages/:_id', {_id: '@id'},
        {update: {method: 'PUT', isArray: false}
    });
    return InnerPageResource;
});